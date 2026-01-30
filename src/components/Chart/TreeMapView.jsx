import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { DownloadOutlined } from "@ant-design/icons";
//import expandicon from "../../assets/images/expandicon.png"
import maximize from "../../assets/images/maximize.png"
import minimize from "../../assets/images/minimize.png"
import { MindMapStyled } from "../../styles/components/chart/index"
const TreeMapView = ({ data }) => {
  const svgRef = useRef(null);

  const [expanded, setExpanded] = useState(false)
  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();;
    let isExpanded = expanded;

    const container = svg
      .append("g")
      .attr("class", "zoom-container")
      .attr("transform", "translate(-500, 10)");

    // ----------------- TEXT WRAP ------------------
    function wrapText(text, maxWidth) {
      text.each(function () {
        const textNode = d3.select(this);

        const words = textNode?.text()?.split(/\s+/).reverse();
        let line = [];
        let lineNumber = 0;
        const lineHeight = 1;
        const y = textNode.attr("y");
        const dy = parseFloat(textNode.attr("dy"));

        const baseX = textNode.attr("x");

        let tspan = textNode
          .text(null)
          .append("tspan")
          .attr("x", baseX)
          .attr("y", y)
          .attr("dy", dy + "em");

        let word;
        while ((word = words.pop())) {
          line.push(word);
          tspan.text(line.join(" "));

          if (tspan.node().getComputedTextLength() > maxWidth - 20) {
            line.pop();
            tspan.text(line.join(" "));
            line = [word];
            tspan = textNode
              .append("tspan")
              .attr("x", baseX)
              .attr("y", y)
              .attr("dy", ++lineNumber * lineHeight + dy + "em")
              .text(word);
          }
        }
        const lines = textNode.selectAll("tspan").nodes().length;
        textNode.datum().lineCount = lines;

        // Keep your 2-line vertical adjustment
        if (lines > 1) {
          textNode.selectAll("tspan")
            .attr("dy", (_, i) => i === 0 ? "-0.9em" : "1.3em");
        }


      });
    }


    // ----------------- BUILD TREE ------------------
    const root = d3.hierarchy(data || {});


    function collapse(node) {
      if (node.children) {
        node._children = node.children;
        node.children = null;
        node._children.forEach(collapse);
      }
    }
    root.children?.forEach(collapse);

    const treeLayout = d3
      .tree()
      .nodeSize([90, 650])
      .separation((a, b) => {
        const ah = a.rectHeight || 50;
        const bh = b.rectHeight || 50;
        return (ah + bh) / 80;
      })

    // ----------------- ZOOM ------------------
    const zoom = d3.zoom()
      .scaleExtent([0.3, 8])
      .on("start", (event) => {
        if (event.sourceEvent && event.sourceEvent.type === "mousedown") {
          d3.select(svgRef.current).classed("grabbing", true);
        }
      })
      .on("zoom", (event) => {
        container.attr("transform", event.transform);
      })
      .on("end", () => {
        d3.select(svgRef.current).classed("grabbing", false);
      });


    svg.call(zoom);

    // ---- INITIAL ZOOM LEVEL ----
    const initialScale = 1.2;
    const initialX = 0;
    const initialY = 10;

    svg.call(
      zoom.transform,
      d3.zoomIdentity
        .translate(initialX, initialY)
        .scale(initialScale)
    );


    // ----------------- ADD ZOOM-IN / ZOOM-OUT BUTTON HANDLERS ------------------
    d3.select("#zoom-in").on("click", () => {
      svg.transition().duration(300).call(zoom.scaleBy, 1.2);
    });

    d3.select("#zoom-out").on("click", () => {
      svg.transition().duration(300).call(zoom.scaleBy, 0.8);
    });

    // ----------------- NODE SIZE CALC ------------------
    function computeNodeSizes(nodes) {
      const temp = svg
        .append("text")
        .attr("font-size", 20)
        .attr("visibility", "hidden");

      nodes.forEach((d) => {
        let line = "";
        let lines = 1;

        d?.data?.name?.split(" ").forEach((w) => {
          temp.text(line + " " + w);
          if (temp.node().getComputedTextLength() > 420) {
            line = w;
            lines++;
          } else {
            line += " " + w;
          }
        });

        d.rectWidth = 500;
        d.rectHeight = Math.max(50, lines * 32);
      });

      temp.remove();
    }

    // ----------------- EDGE CURVE ------------------
    function linkPath(d) {
      const s = d.source;
      const t = d.target;
      const toggleRightEdge = s.y + s.rectWidth / 2 + 10 + 34;
      const sx = toggleRightEdge;
      const sy = s.x;
      const tx = t.y - t.rectWidth / 2;
      const ty = t.x;
      const mx = (sx + tx) / 2;

      return `
    M ${sx},${sy}
    C ${mx},${sy}
      ${mx},${ty}
      ${tx},${ty}
  `;
    }




    // ----------------- UPDATE FUNCTION ------------------
    function update(source) {
      treeLayout(root); const nodes = root.descendants();
      const links = root.links();
      computeNodeSizes(nodes);
      const node = container
        .selectAll(".node")
        .data(nodes, (d) => d.id || (d.id = Math.random()));

      const nodeEnter = node
        .enter()
        .append("g")
        .attr("class", "node")
        .attr("data-id", (d) => d.data.id || d.id)
        .attr("transform", () => `translate(${source.y0 || 0},${source.x0 || 0})`);

      // TEXT (for measuring)
      nodeEnter.append("text")
        .attr("text-anchor", "start")
        .attr("x", (d) => -(d.rectWidth / 2) + 40)
        .attr("font-size", 20)
        .attr("fill", "#FAFAFB")
        .attr("dy", "0.4em")
        .text((d) => d.data.name)
        .call((text) => wrapText(text, 450))
        .each(function (d) {
          d3.select(this).append("title").text(d.data.name);
        });

      // measure text bbox for all nodes (enter+y)
      nodeEnter.each(function (d) {
        const textNode = d3.select(this).select("text").node();
        const bbox = textNode.getBBox();
        d.textWidth = bbox.width;
        d.textHeight = bbox.height;
      });

      // ALSO measure existing nodes (in case their text changed but they weren't in enter)
      node.each(function (d) {
        const textNode = d3.select(this).select("text").node();
        if (textNode) {
          const bbox = textNode.getBBox();
          d.textWidth = bbox.width;
          d.textHeight = bbox.height;
        }
      });

      // 2) STANDARDIZE SIZES PER DEPTH using measured text sizes (this finalizes rectWidth/rectHeight)
      const depthGroups = d3.group(root.descendants(), (d) => d.depth);
      depthGroups.forEach((nodesAtDepth, depth) => {
        const maxWidth = d3.max(nodesAtDepth, (n) => n.textWidth || 0);
        //const maxHeight = d3.max(nodesAtDepth, (n) => n.textHeight || 0);

        // Base dynamic width
        let finalWidth = maxWidth + 50;

        // Force fixed width for deeper levels (3rd and 4th)
        if (depth === 2 || depth === 3) {
          finalWidth = 450;   // 👈 Adjust if you want different size
        }

        nodesAtDepth.forEach((n) => {
          n.rectWidth = finalWidth;
          const lineCount = n.lineCount || 1;
          n.rectHeight = (lineCount * 24) + 40;
        });
      });


      // 3) Now append rects and toggles (they will use finalized rectWidth/rectHeight)
      const depthColors = [
        "#CFFAE1",
        "#FFE4B9",
        "#D2F8FF",
        "#E6EEC7",
        "#E0EAFF",
        "#795548",
        "#607D8B",
      ];
      const deeparrowcolors = [
        "#2F8F87",
        "#B88517",
        "#0089A2",
        "#84A210",
        "#84A210",
        "#84A210",
        "#84A210",
      ]
        ;

      nodeEnter.append("rect")
        .attr("width", (d) => d.rectWidth)
        .attr("height", (d) => d.rectHeight)
        .attr("x", (d) => -(d.rectWidth / 2))
        .attr("y", (d) => -(d.rectHeight / 2))
        .attr("rx", 24)
        .attr("fill", (d) => depthColors[d.depth] || depthColors[depthColors.length - 1]);
      const togglers = nodeEnter.filter((d) => d.children || d._children);
      togglers
        .append("rect")
        .attr("class", "toggle-box")
        .attr("width", 34)
        .attr("height", 34)
        .attr("x", (d) => d.rectWidth / 2 + 10)
        .attr("y", -17)
        .attr("rx", 24)
        .attr("fill", (d) => depthColors[d.depth] || depthColors[depthColors.length - 1])
        .style("cursor", "pointer")
        .on("click", (event, d) => {
          event.stopPropagation();
          toggleNode(d);
        });

      togglers
        .append("text")
        .attr("class", "toggle-symbol")
        .attr("x", (d) => d.rectWidth / 2 + 27)
        .attr("y", 6)
        .attr("font-size", 20)
        .attr("text-anchor", "middle")
        .attr("fill", (d) => deeparrowcolors[d.depth] || deeparrowcolors[deeparrowcolors.length - 1])
        .style("cursor", "pointer")
        .text((d) => (d._children ? ">" : d.children ? "<" : ""))
        .on("click", (event, d) => {
          event.stopPropagation();
          toggleNode(d);
        });
      nodeEnter.append("text")
        .attr("text-anchor", "start")
        .attr("x", (d) => -(d.rectWidth / 2) + 20)
        .attr("font-size", 20)
        .attr("fill", "#212121")
        .attr("dy", "0.4em")
        .text((d) => d.data.name)
        .call((text) => wrapText(text, 450))
        .each(function (d) {
          d3.select(this).append("title").text(d.data.name);
        });
      // Put links *after* sizes are finalized so linkPath() sees accurate values.
      const linkSelection = container
        .selectAll(".link")
        .data(links, (d) => (d.target.id ? d.target.id : (d.target.id = Math.random())));

      // Enter + merge for links
      linkSelection
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("fill", "none")
        .attr("stroke", (d) => deeparrowcolors[d.source.depth] || deeparrowcolors[deeparrowcolors.length - 1])
        .attr("stroke-width", 2)
        .attr("d", linkPath)
        .merge(linkSelection)
        .attr("stroke", (d) => deeparrowcolors[d.source.depth] || deeparrowcolors[deeparrowcolors.length - 1])
        .attr("d", linkPath);

      linkSelection.exit().remove();

      // Animate nodes into their positions & update toggler symbols for all nodes
      node
        .merge(nodeEnter)
        .transition()
        .duration(280)
        .attr("transform", (d) => `translate(${d.y},${d.x})`);

      node.select(".toggle-symbol")
        .text((d) => {
          if (d._children) return ">";
          if (d.children) return "<";
          return "";
        });

      node.exit().remove();
      nodes.forEach((d) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
      const x0 = d3.min(nodes, (d) => d.x - d.rectHeight);
      const x1 = d3.max(nodes, (d) => d.x + d.rectHeight);
      const y0 = d3.min(nodes, (d) => d.y - d.rectWidth);
      const y1 = d3.max(nodes, (d) => d.y + d.rectWidth);

      svg.attr(
        "viewBox",
        `${y0 - 200} ${x0 - 200} ${y1 - y0 + 400} ${x1 - x0 + 400}`
      );

    }


    function toggleNode(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      update(d);
    }
    function expand(node) {
      if (node._children) {
        node.children = node._children;
        node._children = null;
      }
      if (node.children) {
        node.children.forEach(expand);
      }
    }

    function collapseAll(node) {
      if (node.children) {
        node.children.forEach(collapseAll);
        node._children = node.children;
        node.children = null;
      }
    }
    d3.select("#toggle-expand-collapse").on("click", () => {
      if (isExpanded) {
        collapseAll(root);
      } else {
        expand(root);
      }

      isExpanded = !isExpanded; // flip state
      update(root);

      // reset zoom
      svg.transition().duration(300).call(
        zoom.transform,
        d3.zoomIdentity.translate(initialX, initialY).scale(initialScale)
      );
    });

    // d3.select("#expand-all").on("click", () => {
    //   expand(root);
    //   update(root);
    //   svg.transition().duration(300).call(
    //     zoom.transform,
    //     d3.zoomIdentity.translate(initialX, initialY).scale(initialScale)
    //   );
    // });


    // d3.select("#collapse-all").on("click", () => {
    //   collapseAll(root);
    //   update(root);
    //   svg.transition().duration(300).call(
    //     zoom.transform,
    //     d3.zoomIdentity.translate(initialX, initialY).scale(initialScale)
    //   );
    // });


    update(root);
  }, [data]);
  const handleDownload = () => {
    const svg = svgRef.current;
    if (!svg) return;

    const zoomContainer = svg.querySelector(".zoom-container");
    if (!zoomContainer) return;
    const bbox = zoomContainer.getBBox();
    const exportSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    exportSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    const padding = 50;
    const width = bbox.width + 2 * padding;
    const height = bbox.height + 2 * padding;

    exportSvg.setAttribute("width", width);
    exportSvg.setAttribute("height", height);
    exportSvg.setAttribute(
      "viewBox",
      `${bbox.x - padding} ${bbox.y - padding} ${width} ${height}`
    );
    const cloned = zoomContainer.cloneNode(true);
    cloned.setAttribute("transform", null);

    exportSvg.appendChild(cloned);
    const serializer = new XMLSerializer();
    let svgData = serializer.serializeToString(exportSvg);
    svgData = unescape(encodeURIComponent(svgData));
    const imgSrc = "data:image/svg+xml;base64," + btoa(svgData);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.drawImage(img, 0, 0);
      const pngUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.download = "mindmap.png";
      link.href = pngUrl;
      link.click();
    };
    img.src = imgSrc;
  };
  return (
    <>
      <MindMapStyled>
        <div className="tree-container-wrapper">
          <div className="download-btn-wrapper">
            <button className="download-btn" onClick={handleDownload} >
              <DownloadOutlined className="download-icon" />
              Download
            </button>
          </div>
          <div className="expand-collapse-container">
            <button
              id="toggle-expand-collapse"
              className="expand-btn"
              title="Expand / Collapse"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setExpanded(!expanded)}
            >
              <img
                id="toggle-icon"
                src={expanded ? minimize : maximize}
                alt="toggle"
                style={{ width: 16, height: 16 }}
              />
            </button>

          </div>
          <div className="zoom-panel">
            <button id="zoom-in" title="Zoom in" className="zoom-btn" onMouseDown={(e) => e.preventDefault()}>
              +
            </button>

            <button id="zoom-out" title="Zoom out" className="zoom-btn zoom-divider" onMouseDown={(e) => e.preventDefault()}>
              –
            </button>
          </div>
          <svg ref={svgRef} className="map-svg"></svg>
        </div>
      </MindMapStyled>
    </>

  );

};

export default TreeMapView;
