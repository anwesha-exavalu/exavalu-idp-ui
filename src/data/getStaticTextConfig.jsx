import BackgroundInfoIcon from "../assets/images/Background-Info.png";
import PlanProvisionIcon from "../assets/images/Plan-Provision.png";
import MoneySourcesIcon from "../assets/images/Money-Sources.png";
import EnrollmentIcon from "../assets/images/Enrollment.png";
import EligibilityIcon from "../assets/images/Eligibility.png";
import ContributionsIcon from "../assets/images/Contributions.png";
import WithdrawalsIcon from "../assets/images/Withdrawals.png";
import LoansIcon from "../assets/images/Loans.png";
// import VestingIcon from '../assets/images/Vesting.png';
import ParticipantServicesIcon from "../assets/images/ParticipantServices.png";
// import PlanServicesIcon from '../assets/images/PlanServices.png';
// import InvestmentsIcon from '../assets/images/Investments.png';
import PricingIcon from "../assets/images/Pricing.png";
import review from "../assets/images/review.png";
import exception from "../assets/images/exception.png";

import ingesticon from "../assets/images/ingesticon.png";
import missingdataicon from "../assets/images/missingdataicon.png";
import requesticon from "../assets/images/requesticon.png";

const getEndOfLastMonth = () => {
  const today = new Date();
  const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  return endOfLastMonth.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

const getLastMonthName = () => {
  const today = new Date();
  const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  return endOfLastMonth.toLocaleString("en-US", { month: "long" });
};

export const getStaticTextConfig = (user, dataCount) => {
  const formattedDate = getEndOfLastMonth();
  const currentDate = new Date();

  const currentformattedDate =
    `${String(currentDate.getMonth() + 1).padStart(2, "0")}/` +
    `${String(currentDate.getDate()).padStart(2, "0")}/` +
    `${currentDate.getFullYear()}`;

  const lastMonthName = getLastMonthName();
  const pieDefaultColors = [
    "#005400",
    "#ED6F00",
    "#7DC26A",
    "#DBA053",
    "#7C7A7A",
    "#4A4A4B",
    "#75694F",
    "#B84041",
    "#C3B9A6",
    "#96AFB8",
  ];
  return {
    projectmanager: {
      scopes: ["str_dashboard_project_manager"],
      tabs: [
        {
          label: "Plan Baseline",
          value: 0,
          widgetKeysInJSON: ["plan_record_setup"],
        },
        {
          label: "Plan Data Ingestion",
          value: 1,
          widgetKeysInJSON: ["plan_data_ingestion"],
        },

        {
          label: "Plan Restatements",
          value: 2,
          widgetKeysInJSON: ["plan_restatements"],
        },
      ],
      dashboard: {
        welcomeMessage: `Welcome back, ${user}`,
        overviewSubheading: `Here’s your project overview as of  ${currentformattedDate}`,
        alertMessage: "The market will close early today due to holiday.",
      },
      widgets: {
        strSetupProgress: {
          title: "Setup Progress",
          subtitle: `Plans established & in-process as of ${currentformattedDate}`,
          widgetKeysInJSON: ["str_set_up_progress"],
          defaultColors: ["#117B99", "#A7D300"],
          idKey: "Plans",
        },
        strSetupTrajectory: {
          title: "Setup Trajectory",
          subtitle: `Set up status as of ${currentformattedDate}`,
          viewTable: "View Table",
          widgetKeysInJSON: ["str_set_up_trajectory"],
          yAxisLabel: "Number of Plans Established",
          kpis: ["Setup Complete", "In Process", "Not Started", "All"],
          lineColors: {
            "Setup Complete": "#117B99",
            "In Process": "#728F00",
            "Not Started": "#D97F00",
            "Expected Completion": "#58B9FF",
          },
          fillColors: {
            "Setup Complete": "none",
            "In Process": "none",
            "Not Started": "none",
            "Expected Completion": "url(#gradient100)",
          },
        },
        planRecordSetup: {
          planRecordsEstablished: {
            title: "Baseline Plan Records Established",
            subtitle: `Plan data inventory established as of ${currentformattedDate}`,
            text: "Plan records establish a plan level baseline for all data loaded",
            widgetKeysInJSON: ["plan_records_established"],
          },
          planDataElements: {
            title: "Baseline Data Elements Captured",
            subtitle: `Plan data elements as of ${currentformattedDate}`,
            text: "Each plan record is made up of multiple data elements from your existing systems that help identify and associate incoming data to each plan record.",
            widgetKeysInJSON: ["plan_data_elements"],
          },
          systemDataIngestion: {
            title: "Plan Baseline Data Detail",
            subtitle: `Not in good order (NIGO) breakdown by data segment as of ${currentformattedDate}`,
            text: "Data from your system will be verified to ensure that it is in good order before it is committed as a record.",
            widgetKeysInJSON: ["system_data_ingestion"],
            xAxisLabel: "Data Elements in Thousands",
            stackColors: {
              "Missing Data": "#58B9FF",
              "Data Anomaly": "#3BABAB",
              "Custom Data": "#117B99",
              Unidentified: "#B0DE00",
            },
            viewTable: "View Table",
          },
        },
        planDataIngestion: {
          tabs: [
            {
              label: "System Rules",
              value: 0,
              recordKeepingSystemDataIngestion: {
                title: "System Data Ingestion",
                subtitle: `Not in good order (NIGO) breakdown by data segment as of ${currentformattedDate}`,
                text: "Plan administrative data from the recordkeeping system that will be verified to ensure that it is in good order before it is committed.",
                widgetKeysInJSON: ["recordkeeping_data_ingestion"],
                xAxisLabel: "Data Elements in Thousands",
                tableTitle: "Not in Good Order (NIGO) Breakdown",
                tabletext:
                  "Data that is not in good order (NIGO) is data that may not be what is expected or may not be relevant to the functions of the App. This data will require special processing before it can be committed to the database.",
                stackColors: {
                  "Missing Data": "#58B9FF",
                  "Data Anomaly": "#3BABAB",
                  "Custom Data": "#117B99",
                  Unidentified: "#B0DE00",
                },
              },
            },
            {
              label: "Documents Ingestion",
              value: 2,

              documentIngestionProgress: {
                title: "Ingestion Progress",
                subtitle: `ingestion as of ${currentformattedDate}`,
                text: "Document ingestion is the process by which an electronic document is digitized so that specific data elements may be extracted, identified, associated with a plan, and stored to establish the plan rules needed for comparative analysis.",
                ingestionClassifiers: ["Documents", "Pages"],
                widgetKeysInJSON: ["document_page_ingestionprogress"],
                colors: {
                  Successful: "#117B99",
                  Failed: "#FFA412",
                  Remaining: "#58B9FF",
                },
              },
              documentIgoBreakdown: {
                title: "In Good Order - Added to Plan Inventories",
                text: "Documents in good order are those that App can identify and associate with known retirement plan records.Once complete the digitized document and its extracted data will be committed to App and applied to a plan's documents inventory.",
                viewTable: "View Table",
                colors: {
                  Regulatory: "#117B99",
                  "Investment/Advisory": "#3BABAB",
                  "Legal Plan Documents": "#A7D300",
                  "Service Agreement/Contract": "#58B9FF",
                },
                widgetKeysInJSON: ["in_good_order_breakdown"],
              },
              documentNigoBreakdown: {
                title: "Not In Good Order / Out of Scope ",
                text: "Documents not in good order are those that cannot or should not be committed to App.These documents may have formatting issues, be missing plan details or may not contain relevant administration details.These documents may require additional review.",
                viewTable: "View Table",
                colors: {
                  "Non-Required Documents": "#117B99",
                  "Documents Extracted with Anomalies": "#A7D300",
                  "Unidentified Document Type": "#58B9FF",
                },
                widgetKeysInJSON: ["not_in_good_order_breakdown"],
              },
            },
            {
              label: "Documents Inventories",
              value: 1,
              planDocumentInventoryStatus: {
                title: "Plan Documents Inventories Status",
                subtitle: `Plan document inventories established as of ${currentformattedDate}`,
                text: "A Plan Documents Inventory is a digitized collection of various legal, regulatory and contractual documents that define the rules for administering a retirement plan. Once established, App will compare the data from the plan inventories to that of various plan administrative systems to ensure the plan is operating in accordance with plan rules.",
                widgetKeysInJSON: ["plan_document_inventory_status"],
              },
              planDocumentInventoryProgress: {
                title: "Plan Documents Inventories Progress",
                subtitle: `Monthly plan completion as of ${currentformattedDate}`,
                viewTable: "View Table",
                text: "This chart provides insight into the progress of establishing plan document inventories for the business.",
                widgetKeysInJSON: ["plan_document_inventoryprogress"],
                yAxisLabel: "Number of Plans Established",
                kpis: ["Setup Complete", "In Process", "Not Started", "All"],
                lineColors: {
                  "Setup Complete": "#117B99",
                  "In Process": "#728F00",
                  "Not Started": "#D97F00",
                  "Expected Completion": "#58B9FF",
                },
                fillColors: {
                  "Setup Complete": "none",
                  "In Process": "none",
                  "Not Started": "none",
                  "Expected Completion": "url(#gradient100)",
                },
              },
            },
          ],
        },
        planRestatements: {
          title: "Document Restatement Summary",
          subtitle: "Number of plans impacted by provision and document type",
          widgetKeysInJSON: ["plan_restatements"],
        },
      },
    },
    clientmanager: {
      tabs: [
        { label: "My Documents", value: 0 },
      ],
      scopes: [
        "str_dashboard_client_manager",
        "str_client_manager_plan",
        "str_client_manager_employer",
      ],
      dashboard: {
        welcomeMessage: `Welcome back, ${user}`,
        overviewSubheading: `Here’s an overview of your plans as of  ${currentformattedDate}`,
        alertMessage: "The market will close early today due to holiday.",
      },
      widgets: {
        dashboardMetrics: {
          text: `Change vs. prior month`,
          widgetKeysInJSON: ["dashboard_metrics"],
        },
        myActions: {
          actionItemsByType: {
            title: "Action Items Summary",

            subtitle: (
              <>
                You have <strong>{dataCount.actionItems} action items</strong>{" "}
                for <strong>11 plans</strong> that require your attention
              </>
            ),

            widgetKeysInJSON: ["action_items_by_type"],
          },
          riskProfile: {
            title: "Risk Profile",
            subtitle: `Plan data discrepancies requiring attention for plans established`,

            widgetKeysInJSON: ["risk_profile"],
          },
          actionItems: {
            title: "Action Items",

            subtitle: (
              <>
                You have <strong>{dataCount.actionItems} action items</strong>{" "}
                for <strong>11 plans</strong> that require your attention
              </>
            ),

            widgetKeysInJSON: ["action_items"],
            filteringCriteria: ["Risk Level", "Category", "Status", "Due Date"],
            toolbar: ["search", "upload", "download"],
          },
          actionItemDetail: {
            title: "Action Item ID: ",

            bodyTitle1: "Situation/Inconsistency",
            bodyText1:
              "This plan has been identified as requiring Adoption Agreement #006. The Adoption Agreement was not located in the plan’s Document Inventory. A client signed version of this document is required to be uploaded.",
            bodyTitle2: `View Comments/Updates Log (${dataCount.actionItemCommntList})`,
            bodyTitle3: "Comment/Notes",
            submitCommentButton: "Submit Comment/Update",
            widgetKeysInJSON: ["action_item_comment_list"],
            toolbar: ["upload", "download"],
          },
        },
        myProducts: {
          productPerformacePieData: {
            title: "Portfolio Performance",
            subtitle: "Portfolio breakdown by market segment and plan type",
            widgetKeysInJSON: ["product_performance_pie_data"],
            defaultColors: pieDefaultColors,
            kpis: ["Market Segment", "Plan Type"],
          },
          productPerformaceBarData: {
            selectLabel: "Select KPI",
            bodyText1: `Products (${dataCount.horizontalBarChartData}) - `,
            kpis: ["Assets", "Plans", "Participants", "Revenue"],
            restingColor: "#3BABAB",
            selectionColor: "#117B99",
            xAxisLabel: "Assets in Millions",
            widgetKeysInJSON: ["product_performance_bar_data"],
          },

          publishedProductOffers: {
            title: "Published Product Offers",
            subtitle: (
              <>
                Total Products{" "}
                <strong>{dataCount.totalProducts} available</strong>{" "}
              </>
            ),
            filteringCriteria: ["Product Name"],
            toolbar: ["offerCompare"],

            widgetKeysInJSON: ["published_products", "all_products"],
          },
          productOfferCompare: {
            title: "Product Offer Compare",
            subtitle: <>Differences in product offer options</>,

            widgetKeysInJSON: ["compare_published_products"],
          },
        },
        myPlans: {
          planPerformacePieData: {
            title: "My Plan Performance",
            subtitle: "Plan breakdown by market and plan type",
            widgetKeysInJSON: ["plan_performance_pie_data"],
            defaultColors: pieDefaultColors,
            kpis: ["Market Segment", "Plan Type"],
          },
          planPerformaceBarData: {
            selectLabel: "Select KPI",
            bodyText1: `Plans (${dataCount.horizontalBarChartData}) - `,
            kpis: ["Assets", "Participants", "Revenue"],
            restingColor: "#3BABAB",
            selectionColor: "#117B99",
            xAxisLabel: "Assets in Millions",
            widgetKeysInJSON: ["plan_performance_bar_data"],
          },

          myPlans: {
            title: `My Plans (${dataCount.myPlans})`,
            subtitle: `A listing of your assigned plans`,

            widgetKeysInJSON: ["my_plans"],
            filteringCriteria: ["Employer", "Plan Type", "Product Offers"],
            toolbar: ["search", "download"],
          },
        },
        myDocuments: {
          documentsPieData: {
            title: "My Document Distribution",
            subtitle: "Document breakdown by market segment and plan type",
            widgetKeysInJSON: ["documents_pie_data"],
            defaultColors: pieDefaultColors,
            kpis: ["Market Segment", "Plan Type"],
          },

          documentsBarData: {
            title: "Missing Document Summary",
            widgetKeysInJSON: [
              "documents_bar_data",
              "document_inventory",
              "my_plans",
            ],

            kpis: ["Documents"],
          },

          documentInventory: {
            title: "Document Inventory",
            subtitle: (
              <span
                style={{ display: "flex", flexDirection: "column", margin: 0 }}
              >

              </span>
            ),
            widgetKeysInJSON: ["document_inventory"],
            filteringCriteria: ["classType", "status"],
            toolbar: ["search", "upload", "download"],
          },
        },
        myInvestments: {
          investmentPieData: {
            title: "My Plan Investments",
            subtitle: "Investments by market segment and plan type",
            widgetKeysInJSON: ["investments_pie_data"],
            defaultColors: pieDefaultColors,
            kpis: ["Market Segment", "Plan Type"],
          },
          investmentBarData: {
            selectLabel: "Select KPI",
            bodyText1: `Investments (${dataCount.horizontalBarChartData}) - `,
            kpis: ["Assets", "Plans", "Participants"],
            restingColor: "#3BABAB",
            selectionColor: "#117B99",
            xAxisLabel: "Assets in Millions",
            widgetKeysInJSON: ["investments_bar_data"],
          },
          investmentsMaster: {
            title: `My Investment List (${dataCount.investmentMaster})`,
            subtitle: "",

            widgetKeysInJSON: ["investments_master"],
            toolbar: ["search", "download"],
          },
        },

        uploadFile: {
          title: "File Upload",
          subtitle: "Info about uploading the file, instruction, etc",
          uploadFileButton: "Upload File",
          bodyText1:
            "Drag and Drop files here, or click here to browse your computer",
          bodyText2: "Upload a PDF or Word file, maximum file size 55 MB.",
          widgetKeysInJSON: ["Upload_file_content"],
        },
      },
      employerWidgets: {
        dashboardMetrics: {
          widgetKeysInJSON: ["dashboard_metrics"],
        },
        employerInformation: {
          title: "Employer Information",
          subtitle: `(as of ${formattedDate})`,
          widgetKeysInJSON: ["employer_information"],
        },
        riskProfile: {
          title: "Risk Profile",
          subtitle: `Action items as of ${formattedDate}. Click numbers for additional information`,

          widgetKeysInJSON: ["risk_profile"],
        },
        actionItemsByType: {
          title: "Action Items by Type",

          subtitle: (
            <>
              You have{" "}
              <strong>{dataCount.employerActionItems} action items</strong> for{" "}
              {dataCount.employerActionItemPlans} plans that require your
              attention
            </>
          ),
          extraText: "Access your action Item table for more details.",
          viewActionItemsButton: "View Action Items",
          widgetKeysInJSON: ["action_items_by_type"],
        },
        employerPlansStatistics: {
          title: `Employer Plan Statistics (${dataCount.employerPlanStatistics} Plans)`,
          subtitle: `Employer plan statistics as of ${formattedDate}`,
          widgetKeysInJSON: ["employer_plans_stats"],
          filteringCriteria: [
            "Total Assets",
            "Total Participants",
            "Total Revenue",
          ],
        },
        employerPlans: {
          title: `Employer Plans (${dataCount.employerPlans})`,
          subtitle: "",
          widgetKeysInJSON: ["employer_plans"],
          filteringCriteria: ["Plan Type", "Product"],
          toolbar: ["search", "download"],
        },
        actionItems: {
          title: `Action Items`,
          subtitle: (
            <>
              You have{" "}
              <strong>{dataCount.employerActionItems} action items</strong>{" "}
              needed for {dataCount.employerActionItemPlans} plans
            </>
          ),
          widgetKeysInJSON: ["employer_action_items"],
          filteringCriteria: ["Risk Level", "Category", "Status", "Due Date"],
          toolbar: ["search", "upload", "download"],
        },
        employerContacts: {
          title: `Employer Contacts (${dataCount.employerContacts})`,
          subtitle: "",
          widgetKeysInJSON: ["employer_contacts"],
          filteringCriteria: ["Type", "Role", "Name"],
          toolbar: ["search", "download"],
        },
      },
      planWidgets: {
        dashboardMetrics: {
          widgetKeysInJSON: ["dashboard_metrics"],
        },
        planInformation: {
          title: "Plan Information",
          subtitle: `(as of ${formattedDate})`,
          widgetKeysInJSON: ["plan_information"],
        },

        actionItemsByType: {
          title: "Action Items by Type",

          subtitle: (
            <>
              You have <strong>{dataCount.planActionItems} action items</strong>{" "}
              that require your attention
            </>
          ),
          extraText: "Access your action Item table for more details.",
          viewActionItemsButton: "View Action Items",
          widgetKeysInJSON: ["action_items_by_type"],
        },
        documentInventorySummary: {
          title: `Document Inventory Summary`,
          subtitle: "",
          widgetKeysInJSON: [
            "document_inventory_summary_data",
            "documents_require_action",
          ],
          extraText1: (
            <>
              You have{" "}
              <strong>{dataCount.documentsRequireAttention} Documents</strong>{" "}
              that requires your attention.
            </>
          ),
          extraText2: "Access your document inventory table for more details.",
          goToDocumentInventoryButton: "Go to Document Inventory",
        },

        actionItems: {
          title: `Action Items`,
          subtitle: (
            <>
              You have{" "}
              <strong>{dataCount.planActionItems} action items</strong>{" "}
            </>
          ),
          widgetKeysInJSON: ["action_items"],
          filteringCriteria: ["Risk Level", "Category", "Status", "Due Date"],
          toolbar: ["search", "upload", "download"],
        },
        documentInventory: {
          title: "Document Inventory",
          subtitle: (
            <span style={{ display: "flex", margin: 0 }}>
              <span>
                Required documents :
                <strong> {dataCount.planRequiredDocuments}</strong>
              </span>
              <span style={{ marginLeft: "20px" }}>
                Other archived documents :
                <strong> {dataCount.planArchivedDocuments ?? 0}</strong>
              </span>
            </span>
          ),

          widgetKeysInJSON: ["document_inventory"],
          filteringCriteria: ["Class", "Status", "Type"],
          toolbar: ["search", "upload", "download"],
        },
        planInvestments: {
          title: `Plan Investments (${dataCount.planInvestments})`,
          subtitle: "",

          widgetKeysInJSON: ["plan_investments"],
          filteringCriteria: ["Provider", "Fund Name", "Fund ID"],
          toolbar: ["search", "download"],
        },
        planContacts: {
          title: `Plan Contacts (${dataCount.planContacts})`,
          subtitle: "",
          widgetKeysInJSON: ["plan_contacts"],
          filteringCriteria: ["Type", "Role", "Name"],
          toolbar: ["search", "download"],
        },
      },
    },
    seniorleader: {
      scopes: ["str_dashboard_senior_leader", "str_product_senior_leader"],
      productWidgets: {
        subTabs: [
          { label: "Product Flows", value: 0 },
          { label: "Customer Outcomes", value: 1 },
          { label: "Distribution Performance", value: 2 },
          { label: "Risk & Opportunities", value: 3 },
          { label: "Investments", value: 4 },
        ],

        dashboard: {
          welcomeMessage: `Welcome back, ${user}`,
          overviewSubheading: `Here’s an overview of your book of business as of ${formattedDate}`,
        },
        widgets: {
          dashboardMetrics: {
            text: `Change vs. prior month`,
            widgetKeysInJSON: ["dashboard_metrics"],
          },
          productPerformacePieData: {
            title: "Portfolio Performance",
            subtitle: "Portfolio breakdown by market segment and plan type",
            widgetKeysInJSON: ["product_performance_pie_data"],
            defaultColors: pieDefaultColors,
            kpis: ["Market Segment", "Plan Type"],
          },
          productPerformaceBarData: {
            selectLabel: "Select KPI",
            bodyText1: `Products (${dataCount.horizontalBarChartData}) - `,
            kpis: ["Assets", "Plans", "Participants", "Revenue"],
            restingColor: "#3BABAB",
            selectionColor: "#117B99",
            xAxisLabel: "Assets in Millions",
            widgetKeysInJSON: ["product_performance_bar_data"],
          },
          productMomChange: {
            title: (
              <>
                Month over Month <br /> Change %
              </>
            ),
            xAxisLabel: "In Percentage",
            widgetKeysInJSON: ["product_performance_bar_data"],
          },
          productFlows: {
            verticalStackedBarChartData: {
              title: "Net Flows",
              subtitle:
                "Monthly asset inflows and outflows for the trailing 12 months",
              widgetKeysInJSON: ["product_flows_net_flow"],
              defaultColors: [
                "rgba(17, 123, 153, 1)",
                "rgba(255, 192, 192, 1)",
                "rgba(88, 185, 255, 1)",
                "rgba(255, 107, 107, 1)",

                "rgba(133, 93, 146, 1)",
              ],
              groupByFields: ["Month"],
              sumUpFields: [
                "Contribution",
                "Distributions",
                "New Business",
                "Lost Business",
                "Net Flow",
              ],
            },
          },
          customerOutcomes: {
            planHealthMetricsChart: {
              title: "Plan Health Metrics",
              subtitle:
                "Monthly retirement outcomes being generated by plans for the trailing 12 months",
              widgetKeysInJSON: ["plan_health_metrics"],
              defaultColors: ["#2CA414", "#58B9FF", "#855D92"],
              groupByFields: ["Date"],
              sumUpFields: [],
              avgFields: [
                "Participation Rate",
                "Income Replacement",
                "Contribution Rate",
              ],
            },
            planHealthForMonth: {
              monthTitle: `Plan Health for ${lastMonthName}`,
              subtitle:
                "Prior month retirement outcomes being generated by plans by product",
              title: "Products",
              widgetKeysInJSON: ["plan_health_for_month"],
            },
          },
          investments: {
            title: "Investments by Product",
            subtitle: "Investments offered by plans in the selected product(s)",
            widgetKeysInJSON: ["investments"],
            groupByFields: [],
            sumUpFields: [],
            toolbar: ["search", "download"],
          },
          distributionPerformance: {
            distributiondataElements: {
              title:
                "Sales Partner Effectiveness - Win Rate vs % Wins with Exceptions",
              subtitle: `Trailing 12 month effectiveness, as of ${formattedDate}`,
              kpis: ["Sales Partner", "Firm"],
            },
            BubblechartdataElement: {
              widgetKeysInJSON: ["advisory_effectiveness"],
              defaultColors: ["#00837A"],
              tabs: ["Sales Partner", "Firm"],
              groupByFields: ["Sales Partner", "Firm"],
              sumUpFields: ["Proposals", "Wins", "Exceptions", "Total Assets"],
            },
            TPAEffectivenessdataElement: {
              widgetKeysInJSON: ["tpa_effectiveness"],
              title:
                " TPA Effecitvness - Assets and Average Exceptions Per Plan",
              subtitle: `Trailing 12 months effectivness, as of ${formattedDate}`,
              defaultColors: ["rgba(17, 123, 153, 1)", "rgba(255, 164, 18, 1)"],
              barKeys: ["Assets", "Average Exceptions Per Plan"],
              groupByFields: ["Firm"],
              sumUpFields: ["Assets", "Average Exceptions per Plan"],
            },
          },
          riskAndOpportunities: {
            riskProfile: {
              title: "Risk Profile",
              subtitle: `Plan data discrepancies requiring attention`,

              widgetKeysInJSON: ["risk_profile"],
              groupByFields: ["Risk Type"],

              sumUpFields: ["Count"],
            },
            expectionperplan: {
              title: "Average Number of Exception per Plan",
              subtitle:
                "Average number of product exceptions by plan, trailing 12 months",
              widgetKeysInJSON: ["average_exceptions_per_plan"],
              groupByFields: ["Month"],
              avgFields: ["Average Number of Exceptions per Plan"],
              sumUpFields: [],
            },
            portfolio: {
              title: "Portfolio Opportunities",
              subtitle:
                "Potential opportunities to improve business performance",
              widgetKeysInJSON: ["portfolio_opportunities"],
              groupByFields: ["Feature", "Type", "Encourage"],
              sumUpFields: ["Plan", "AuA"],
            },
          },
        },
      },
      dashboard: {
        welcomeMessage: `Welcome back, ${user}`,
        overviewSubheading: `Here's an overview of the plans as of  ${currentDate.toLocaleDateString("en-US")}`,
      },
      dashboardWidgets: {
        strSetupTrajectory: {
          title: "Setup Trajectory",
          subtitle: `Monthly plan completion as of ${currentformattedDate}`,
          viewTable: "View Table",
          widgetKeysInJSON: ["str_set_up_trajectory"],
          yAxisLabel: "Number of Plans Established",
          kpis: ["Setup Complete", "In Process", "Not Started", "All"],
          lineColors: {
            "Setup Complete": "#117B99",
            "In Process": "#728F00",
            "Not Started": "#D97F00",
            "Expected Completion": "#58B9FF",
          },
          fillColors: {
            Complete: "none",
            "In Process": "none",
            "Not Started": "none",
            "Expected Completion": "url(#gradient100)",
          },
        },
        strSetupProgress: {
          title: "Setup Progress",
          subtitle: "Plans established & in-process as of ${formattedDate}",
          widgetKeysInJSON: ["str_setup_progress"],
          defaultColors: ["#117B99", "#A7D300"],
          idKey: "Plans",
        },
        planDistributionPieData: {
          title: "Plan Portfolio",
          subtitle: "Summary of plans",
          widgetKeysInJSON: ["plan_distribution_pie_data"],
          defaultColors: pieDefaultColors,
          kpis: ["Market Segment", "Plan Type"],
        },
        systemDataSummary: {
          title: "System Data Summary",
        },
        documentsBarData: {
          title: "Missing Document Summary",
          widgetKeysInJSON: [
            "documents_bar_data",
            "document_inventory",
            "plan_inventory",
          ],

          kpis: ["Plans"],
        },
        riskProfileChart: {
          title: "Risk Profile",
          subtitle: `Plan data discrepancies requiring attention for plans`,
          note: "For plans fully onboarded to App",
          widgetKeysInJSON: ["risk_profile"],
        },
        portfolioOpportunities: {
          title: "Portfolio Opportunities",
          subtitle:
            "Potential opportunities to improve business performance for plans",
          widgetKeysInJSON: ["portfolio_opportunities"],
        },
      },
    },
    productmanager: {
      scopes: ["str_product_product_manager"],
      dashboard: {
        welcomeMessage: `Welcome back, ${user}`,
        overviewSubheading: `Here’s an overview of your book of business as of ${formattedDate}`,
      },
      tabs: [
        { label: "Dashboard", value: 0 },
        { label: "Product Offers", value: 1 },
        { label: "Governance", value: 2 },
      ],
      productDashboard: {
        subTabs: [
          { label: "Product Flows", value: 0 },
          { label: "Customer Outcomes", value: 1 },
          { label: "Distribution Performance", value: 2 },
          { label: "Risk & Opportunities", value: 3 },
          { label: "Investments", value: 4 },
        ],
        widgets: {
          dashboardMetrics: {
            text: `Change vs. prior month`,
            widgetKeysInJSON: ["dashboard_metrics"],
          },
          productPerformacePieData: {
            title: "Portfolio Performance",
            subtitle: "Portfolio breakdown by market segment and plan type",
            widgetKeysInJSON: ["product_performance_pie_data"],
            defaultColors: pieDefaultColors,
            kpis: ["Market Segment", "Plan Type"],
          },
          productPerformaceBarData: {
            selectLabel: "Select KPI",
            bodyText1: `Products Offers (${dataCount.horizontalBarChartData}) - `,
            kpis: ["Assets", "Plans", "Participants", "Revenue"],
            restingColor: "#3BABAB",
            selectionColor: "#117B99",
            xAxisLabel: "Assets in Millions",
            widgetKeysInJSON: ["product_performance_bar_data"],
          },
          productMomChange: {
            title: (
              <>
                Month over Month <br /> Change %
              </>
            ),
            xAxisLabel: "In Percentage",
            widgetKeysInJSON: ["product_performance_bar_data"],
          },
          productFlows: {
            verticalStackedBarChartData: {
              title: "Net Flows",
              widgetKeysInJSON: ["product_flows_net_flow"],
              defaultColors: [
                "rgba(17, 123, 153, 1)",
                "rgba(255, 192, 192, 1)",
                "rgba(88, 185, 255, 1)",
                "rgba(255, 107, 107, 1)",

                "rgba(133, 93, 146, 1)",
              ],
              groupByFields: ["Month"],
              sumUpFields: [
                "Contribution",
                "Distributions",
                "New Business",
                "Lost Business",
                "Net Flow",
              ],
            },
          },
          customerOutcomes: {
            planHealthMetricsChart: {
              title: "Plan Health Metrics",
              subtitle:
                "Monthly retirement outcomes being generated by plans for the trailing 12 months",
              widgetKeysInJSON: ["plan_health_metrics"],
              defaultColors: ["#2CA414", "#58B9FF", "#855D92"],
              groupByFields: ["Date"],
              sumUpFields: [],
              avgFields: [
                "Participation Rate",
                "Income Replacement",
                "Contribution Rate",
              ],
            },
            planHealthForMonth: {
              title: "Products -",
              widgetKeysInJSON: ["plan_health_for_month"],
            },
          },
          investments: {
            title: "Investments by Product",
            widgetKeysInJSON: ["investments"],
            toolbar: ["search", "download"],
          },
          distributionPerformance: {
            distributiondataElements: {
              title:
                "Sales Partner Effectiveness - Win Rate vs % Wins with Exceptions",
              subtitle: `Trailing 12 month effectiveness, as of ${formattedDate}`,
            },
            BubblechartdataElement: {
              widgetKeysInJSON: ["advisory_effectiveness"],
              defaultColors: ["#00837A"],
              tabs: ["Sales Partner", "Firm"],
              groupByFields: ["Sales Partner", "Firm"],
              sumUpFields: ["Proposals", "Wins", "Exceptions", "Total Assets"],
            },
            TPAEffectivenessdataElement: {
              widgetKeysInJSON: ["tpa_effectiveness"],
              title: "TPA Effectiveness, by Top 10 Firms",
              subtitle: `TPA effectiveness as of ${formattedDate}`,
              defaultColors: ["rgba(17, 123, 153, 1)", "rgba(255, 164, 18, 1)"],
              barKeys: ["Assets", "Average Exceptions per Plan"],
              groupByFields: ["Firm"],
              sumUpFields: ["Assets", "Average Exceptions per Plan"],
            },
          },
          riskAndOpportunities: {
            riskProfile: {
              title: "Risk Profile",
              subtitle: `Plan data discrepancies requiring attention`,

              widgetKeysInJSON: ["risk_profile"],
              groupByFields: ["Risk Type"],

              sumUpFields: ["Count"],
            },
            expectionperplan: {
              title: "Average Number of Exception per Plan",
              widgetKeysInJSON: ["average_exceptions_per_plan"],
              groupByFields: ["Month"],
              avgFields: ["Average Number of Exceptions per Plan"],
              sumUpFields: [],
            },
            portfolio: {
              title: "Portfolio Opportunities",
              subtitle:
                "Potential opportunities to improve business performance",
              widgetKeysInJSON: ["portfolio_opportunities"],
              groupByFields: ["Feature", "Type", "Encourage"],
              sumUpFields: ["Plan", "AuA"],
            },
          },
        },
      },
      productOffers: {
        widgetKeysInJSON: ["product_offers"],
        offerCompletionStatus: [
          "Active/Published",
          "Drafts",
          "Closed",
          "Terminated",
        ],
      },
      productGovernance: {
        tabs: [
          { label: "Product Governance Approval", value: 1 },
          { label: "Product Governance Exceptions", value: 0 },
        ],
        productGovernanceExceptions: {
          title: "Exceptions",
          subtitle: "Exceptions per Product Offer",

          widgetKeysInJSON: ["product_governance_exceptions"],
          tabs: [
            { label: "Build/Edit Offer", value: "build" },
            { label: "Review/Submit Offer", value: "review" },
            { label: "Publish Offer", value: "publish" },
            { label: "Offer Insights", value: "insights" },
          ],
          reviewMenus: [
            {
              key: "reviewExceptions",
              icon: (
                <img
                  src={exception}
                  alt="Review Exceptions"
                  width="16"
                  height="16"
                />
              ),
              label: "Review Exceptions",
            },
            {
              key: "reviewOffer",
              icon: (
                <img src={review} alt="Review Offer" width="16" height="16" />
              ),
              label: "Review Offer",
            },
          ],

          menus: [
            {
              key: "Background",
              icon: (
                <img
                  src={BackgroundInfoIcon}
                  alt="Background Info"
                  width="16"
                  height="16"
                />
              ),
              label: "Background",
            },
            {
              key: "planprovisions",
              icon: (
                <img
                  src={PlanProvisionIcon}
                  alt="Plan Provisions"
                  width="16"
                  height="16"
                />
              ),
              label: "Plan Provisions",
              children: [
                {
                  key: "moneySources",
                  icon: (
                    <img
                      src={MoneySourcesIcon}
                      alt="Money Sources"
                      width="16"
                      height="16"
                    />
                  ),
                  label: "Money Sources",
                },
                {
                  key: "enrollment",
                  icon: (
                    <img
                      src={EnrollmentIcon}
                      alt="Enrollment"
                      width="16"
                      height="16"
                    />
                  ),
                  label: "Enrollment",
                },
                {
                  key: "eligibility",
                  icon: (
                    <img
                      src={EligibilityIcon}
                      alt="Eligibility"
                      width="16"
                      height="16"
                    />
                  ),
                  label: "Eligibility",
                },
                {
                  key: "contributions",
                  icon: (
                    <img
                      src={ContributionsIcon}
                      alt="Contributions"
                      width="16"
                      height="16"
                    />
                  ),
                  label: "Contributions",
                },
                {
                  key: "withdrawals",
                  icon: (
                    <img
                      src={WithdrawalsIcon}
                      alt="Withdrawals"
                      width="16"
                      height="16"
                    />
                  ),
                  label: "Withdrawals",
                },
                {
                  key: "loans",
                  icon: (
                    <img src={LoansIcon} alt="Loans" width="16" height="16" />
                  ),
                  label: "Loans",
                },
                {
                  key: "vesting",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                    >
                      <path
                        d="M4.21053 6.76388H9.26316V5.07967C9.26316 4.37791 9.01754 3.78142 8.52632 3.29019C8.03509 2.79897 7.4386 2.55335 6.73684 2.55335C6.03509 2.55335 5.4386 2.79897 4.94737 3.29019C4.45614 3.78142 4.21053 4.37791 4.21053 5.07967V6.76388ZM11.7895 19.3955C10.6246 19.3955 9.63158 18.9849 8.81053 18.1639C7.98947 17.3428 7.57895 16.3498 7.57895 15.1849C7.57895 14.02 7.98947 13.027 8.81053 12.206C9.63158 11.3849 10.6246 10.9744 11.7895 10.9744C12.9544 10.9744 13.9474 11.3849 14.7684 12.206C15.5895 13.027 16 14.02 16 15.1849C16 16.3498 15.5895 17.3428 14.7684 18.1639C13.9474 18.9849 12.9544 19.3955 11.7895 19.3955ZM13.1789 17.1639L13.7684 16.5744L12.2105 15.0165V12.6586H11.3684V15.3534L13.1789 17.1639ZM6.94737 18.5534H1.68421C1.22105 18.5534 0.824561 18.3884 0.494737 18.0586C0.164912 17.7288 0 17.3323 0 16.8691V8.44809C0 7.98493 0.164912 7.58844 0.494737 7.25861C0.824561 6.92879 1.22105 6.76388 1.68421 6.76388H2.52632V5.07967C2.52632 3.91475 2.93684 2.92177 3.75789 2.10072C4.57895 1.27967 5.57193 0.869141 6.73684 0.869141C7.90175 0.869141 8.89474 1.27967 9.71579 2.10072C10.5368 2.92177 10.9474 3.91475 10.9474 5.07967V6.76388H11.7895C12.2526 6.76388 12.6491 6.92879 12.9789 7.25861C13.3088 7.58844 13.4737 7.98493 13.4737 8.44809V9.54282C13.193 9.44458 12.9123 9.37791 12.6316 9.34282C12.3509 9.30774 12.0702 9.29019 11.7895 9.29019C10.1474 9.29019 8.75439 9.86212 7.61053 11.006C6.46667 12.1498 5.89474 13.5428 5.89474 15.1849C5.89474 15.7884 5.98947 16.3744 6.17895 16.9428C6.36842 17.5112 6.62456 18.0481 6.94737 18.5534Z"
                        fill="#9E9E9E"
                      />
                    </svg>
                  ),
                  label: "Vesting",
                },
              ],
            },
            {
              key: "participantServices",
              icon: (
                <img
                  src={ParticipantServicesIcon}
                  alt="Participant Services"
                  width="16"
                  height="16"
                />
              ),
              label: "Participant Services",
            },
            {
              key: "planServices",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M5.95204 15.4636C4.23975 15.0987 2.8187 14.2285 1.68888 12.8531C0.559053 11.4776 -0.00585938 9.87763 -0.00585938 8.05307C-0.00585938 5.94781 0.730983 4.15833 2.20467 2.68465C3.67835 1.21096 5.46782 0.474121 7.57309 0.474121C9.67835 0.474121 11.4678 1.21096 12.9415 2.68465C14.4152 4.15833 15.152 5.94781 15.152 8.05307C15.152 8.65658 15.0819 9.24254 14.9415 9.81096C14.8012 10.3794 14.6047 10.9162 14.352 11.4215H9.21519C8.28888 11.4215 7.50291 11.7513 6.8573 12.411C6.21168 13.0706 5.88888 13.8636 5.88888 14.7899C5.88888 14.9022 5.89239 15.0145 5.8994 15.1268C5.90642 15.239 5.92397 15.3513 5.95204 15.4636ZM9.2573 10.9162L10.4362 9.73728L8.41519 7.71623V3.84254H6.73098V8.38991L9.2573 10.9162ZM9.2573 16.4741H14.3099C14.7731 16.4741 15.1696 16.3092 15.4994 15.9794C15.8292 15.6496 15.9941 15.2531 15.9941 14.7899C15.9941 14.3268 15.8292 13.9303 15.4994 13.6004C15.1696 13.2706 14.7731 13.1057 14.3099 13.1057H9.2573C8.79414 13.1057 8.39765 13.2706 8.06783 13.6004C7.738 13.9303 7.57309 14.3268 7.57309 14.7899C7.57309 15.2531 7.738 15.6496 8.06783 15.9794C8.39765 16.3092 8.79414 16.4741 9.2573 16.4741Z"
                    fill="#9E9E9E"
                  />
                </svg>
              ),
              label: "Plan Services",
            },
            {
              key: "tpaservices",
              icon: (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.1941 10.4024C10.5275 10.4024 9.96081 10.1691 9.49414 9.70244C9.02747 9.23577 8.79414 8.66911 8.79414 8.00244C8.79414 7.33577 9.02747 6.76911 9.49414 6.30244C9.96081 5.83577 10.5275 5.60244 11.1941 5.60244C11.8608 5.60244 12.4275 5.83577 12.8941 6.30244C13.3608 6.76911 13.5941 7.33577 13.5941 8.00244C13.5941 8.66911 13.3608 9.23577 12.8941 9.70244C12.4275 10.1691 11.8608 10.4024 11.1941 10.4024ZM6.39414 16.0024V13.6824C6.39414 13.4024 6.46081 13.1391 6.59414 12.8924C6.72747 12.6458 6.91414 12.4491 7.15414 12.3024C7.58081 12.0491 8.03081 11.8391 8.50414 11.6724C8.97747 11.5058 9.46081 11.3824 9.95414 11.3024L11.1941 12.8024L12.4341 11.3024C12.9275 11.3824 13.4075 11.5058 13.8741 11.6724C14.3408 11.8391 14.7875 12.0491 15.2141 12.3024C15.4541 12.4491 15.6441 12.6458 15.7841 12.8924C15.9241 13.1391 15.9941 13.4024 15.9941 13.6824V16.0024H6.39414ZM4.79414 13.6824V14.4024H1.59414C1.15414 14.4024 0.777474 14.2458 0.464141 13.9324C0.150807 13.6191 -0.00585938 13.2424 -0.00585938 12.8024V1.60244C-0.00585938 1.16244 0.150807 0.785775 0.464141 0.472441C0.777474 0.159108 1.15414 0.00244141 1.59414 0.00244141H12.7941C13.2341 0.00244141 13.6108 0.159108 13.9241 0.472441C14.2375 0.785775 14.3941 1.16244 14.3941 1.60244V5.60244C13.9808 5.08244 13.5141 4.68577 12.9941 4.41244C12.4741 4.13911 11.8741 4.00244 11.1941 4.00244V3.20244H3.19414V4.80244H8.79414C8.52747 5.01577 8.28747 5.25577 8.07414 5.52244C7.86081 5.78911 7.68081 6.08244 7.53414 6.40244H3.19414V8.00244H7.19414C7.19414 8.28244 7.22414 8.55577 7.28414 8.82244C7.34414 9.08911 7.42747 9.34911 7.53414 9.60244H3.19414V11.2024H5.95414C5.59414 11.5091 5.31081 11.8791 5.10414 12.3124C4.89747 12.7458 4.79414 13.2024 4.79414 13.6824Z"
                    fill="#9E9E9E"
                  />
                </svg>
              ),
              label: "TPA Services",
            },
            {
              key: "investments",
              icon: (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.20467 9.78722V3.36202H6.73098V9.78722L5.46782 8.61137L4.20467 9.78722ZM8.41519 11.0471V0.00244141H10.9415V8.52738L8.41519 11.0471ZM-0.00585938 13.9447V6.7216H2.52046V11.425L-0.00585938 13.9447ZM-0.00585938 16.0024L5.42572 10.5851L8.41519 13.1468L13.131 8.44339H11.7836V6.7636H15.9941V10.9631H14.3099V9.61924L8.4994 15.4145L5.50993 12.8528L2.35204 16.0024H-0.00585938Z"
                    fill="#9E9E9E"
                  />
                </svg>
              ),
              label: "Investments",
              children: [
                {
                  key: "advisory",
                  icon: (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.20467 9.78722V3.36202H6.73098V9.78722L5.46782 8.61137L4.20467 9.78722ZM8.41519 11.0471V0.00244141H10.9415V8.52738L8.41519 11.0471ZM-0.00585938 13.9447V6.7216H2.52046V11.425L-0.00585938 13.9447ZM-0.00585938 16.0024L5.42572 10.5851L8.41519 13.1468L13.131 8.44339H11.7836V6.7636H15.9941V10.9631H14.3099V9.61924L8.4994 15.4145L5.50993 12.8528L2.35204 16.0024H-0.00585938Z"
                        fill="#9E9E9E"
                      />
                    </svg>
                  ),
                  label: "Advisory",
                },
                {
                  key: "lineup",
                  label: "Lineup",
                },
                {
                  key: "mapping",
                  label: "Mapping",
                },
              ],
            },
            {
              key: "pricing",
              icon: (
                <img src={PricingIcon} alt="Pricing" width="16" height="16" />
              ),
              label: "Pricing",
            },
          ],
        },
        productGovernanceApprovals: {
          title: "Governance Status",
          subtitle: "Governance Status of pending Product Offers",

          offerInfoTitle: `Product Offer Detail as of (${formattedDate})`,
          offerInfoTabs: [
            {
              label: "Plans",
              value: 0,
              title: `My Plans(${dataCount.myPlans})`,
              widgetKeysInJSON: ["offer_approval_plans"],
              filteringCriteria: ["Employer", "Plan", "Plan ID", "Plan Type"],
              toolbar: ["search", "download"],
            },
            {
              label: "Investments",
              value: 1,
              title: `Investments(${dataCount.investmentMaster})`,
              widgetKeysInJSON: ["offer_approval_investments"],
              filteringCriteria: ["Provider", "Fund Name"],
              toolbar: ["search", "download"],
            },
          ],
          widgetKeysInJSON: [
            "product_governance_approval",
            "offer_approval_info",
            "offer_approval_plans",
            "offer_approval_investments",
          ],
        },
      },
      productOfferBuild: {
        padenDropdownFields: [
          "Preferred",
          "Allowed",
          "Declined",
          "Exception",
          "Not Available",
        ],
        moneySources: [
          {
            moneySourceClassifier: "Employee Deferral Sources",
            moneySourceClassifierId: "employeeDeferralSources",
            moneySourceCategories: [
              {
                category: "Pre-Tax",
                categoryId: "preTax",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label: "Catch Up Contributions",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Email: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "Deferral Changes",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Email: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "In-Person": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "Participant Max Contributions",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Email: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                ],
              },
              {
                category: "After-Tax",
                categoryId: "afterTax",
                providerDefault: "Allowed",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Allowed",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label: "Catch Up Contributions",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "Deferral Changes",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Email: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "In-Person": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "After Tax Reclassification",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Exception",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Exception",
                      },
                      Email: {
                        providerDefault: "Exception",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Exception",
                      },
                      Phone: {
                        providerDefault: "Exception",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Exception",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                    children: [
                      {
                        label: "Participant Elected - opt-out",
                        type: "radio",
                        group: "participantElected",
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                        ancillaryFeeApplicable: true,
                        tooltipText: {
                          Paper: {
                            providerDefault: "Exception",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Exception",
                          },
                          Web: {
                            providerDefault: "Preferred",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Preferred",
                          },
                          "Mobile App": {
                            providerDefault: "Preferred",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          "In-Person": {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          "Plan-Sponsor": {
                            providerDefault: "Not Available",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Preferred",
                          },
                        },
                      },
                      {
                        label: "Participant Elected - opt-in",
                        type: "radio",
                        group: "participantElected",
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                        ancillaryFeeApplicable: false,
                        tooltipText: {
                          Paper: {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          Web: {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Preferred",
                          },
                          "Mobile App": {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          "In-Person": {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          "Plan-Sponsor": {
                            providerDefault: "Preferred",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Preferred",
                          },
                        },
                      },
                    ],
                  },
                  {
                    label: "Participant Maximum Contributions",
                    providerDefault: "Allowed",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                ],
              },
              {
                category: "Roth",
                categoryId: "roth",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label: "Catch Up Contributions Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "Deferral Changes Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "In-Person": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "In Plan Roth Conversions Allowed",
                    providerDefault: "Allowed",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Secure Email": {
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                ],
              },
              {
                category: "Emergency Savings Account (RESA)",
                categoryId: "resa",
                providerDefault: "Allowed",
                marketDemand: "High",
                salesImpact: "High",
                industryRating: "Allowed",
                subCategories: [],
                ancillaryFeeApplicable: true,
              },
            ],
          },
          {
            moneySourceClassifier: "Employer Sources",
            moneySourceClassifierId: "employerSources",
            moneySourceCategories: [
              {
                category: "Company Match",
                categoryId: "companyMatch",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label: "True Up Calculations Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                  },
                  {
                    label: "Roth Treatment of Company Match Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                  },
                ],
              },
              {
                category: "Non-elective Contributions",
                categoryId: "nonElectiveContribution",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label:
                      "Roth Treatment on Non-Elective Contributions Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Exception",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                ],
              },
              {
                category: "Profit Sharing",
                categoryId: "profitSharing",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [],
              },
            ],
          },
          {
            moneySourceClassifier: "Rollover In",
            moneySourceClassifierId: "rolloverIn",
            moneySourceCategories: [
              {
                category: "Rollover In",
                categoryId: "rolloverIn",
                providerDefault: "Preferred",
                marketDemand: "High",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: true,
                subCategories: [
                  {
                    label: "Rollover in allowed from plan",
                    providerDefault: "Allowed",
                    marketDemand: "High",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: true,
                    children: [
                      {
                        label:
                          "401(a) or 403 (b) qualified plan balances (includes 401k)",
                        type: "checkbox",
                        group: "rolloverIAllowedfromPlan",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "403(b) annuity contracts",
                        type: "checkbox",
                        group: "rolloverInAllowedFromPlan",
                        providerDefault: "Exception",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "457 eligible",
                        type: "checkbox",
                        group: "rolloverInAllowedFromPlan",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                    ],
                  },
                  {
                    label: "Rollover in allowed from money sources",
                    providerDefault: "Allowed",
                    marketDemand: "High",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: true,
                    children: [
                      {
                        label: "Designated Roth accounts",
                        type: "checkbox",
                        group: "rolloverInAllowedFromPlan",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "After Tax employee contributions",
                        type: "checkbox",
                        group: "rolloverInAllowedFromPlan",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                    ],
                  },
                  {
                    label: "Rollover in method allowed",
                    providerDefault: "Preferred",
                    marketDemand: "High",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: true,
                    children: [
                      {
                        label: "Direct rollover (roll in) from qualified plan",
                        type: "checkbox",
                        group: "rolloverinMethodAllowed",
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label:
                          "Participant rollover (roll in) from another plan",
                        type: "checkbox",
                        group: "rolloverinMethodAllowed",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                    ],
                  },
                  {
                    label: "Rollover in approvals are completed by",
                    providerDefault: "Allowed",
                    marketDemand: "High",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: true,
                    children: [
                      {
                        label: "Recordkeeper",
                        type: "radio",
                        group: "rolloverinApprovalsCompletedBy",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "Plan Sponsor",
                        type: "radio",
                        group: "rolloverinApprovalsCompletedBy",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "TPA or designated 3rd party ",
                        type: "radio",
                        group: "rolloverinApprovalsCompletedBy",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        loans: [
          {
            category: "Loans Allowed",
            categoryId: "loansallowed",
            loanProvisions: "Loans Allowed",
            providerDefault: "Preferred",
            marketDemand: "Medium",
            salesImpact: "Medium",
            industryRating: "Allowed",
            loanProvisionTypes: [
              {
                label: "General Purpose",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Allowed",
              },
              {
                label: "Hardship",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Allowed",
              },
              {
                label: "Primary Residence",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Allowed",
              },
              {
                label: "Federally Declared Disaster",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Allowed",
              },
            ],
            categories: [
              {
                label: "Spousal consent required to take a loan",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Preferred",
              },
              {
                label: "Loan Modeling allowed",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Preferred",
              },
              {
                label: "Loan Refinancing allowed",
                providerDefault: "Allowed",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Allowed",
              },
              {
                label: "Loan Re-Amortization Allowed",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Preferred",
                group: "payFrequencyChangeMethod",
                subcategories: [
                  {
                    label: "Pay frequency change method",
                    children: [
                      {
                        label: "Automatic",
                        type: "radio",
                        group: "payFrequencyChangeMethod",
                        providerDefault: "Preferred",
                        marketDemand: "Medium",
                        salesImpact: "Medium",
                        industryRating: "Preferred",
                      },
                      {
                        label: "Manual",
                        type: "radio",
                        group: "payFrequencyChangeMethod",
                        providerDefault: "Allowed",
                        marketDemand: "Medium",
                        salesImpact: "Medium",
                        industryRating: "Allowed",
                      },
                    ],
                  },
                  {
                    label: "Participant requested re-amortization method",
                    children: [
                      {
                        label: "Automatic",
                        type: "radio",
                        group: "participantRequestedMethod",
                        providerDefault: "Preferred",
                        marketDemand: "Medium",
                        salesImpact: "Medium",
                        industryRating: "Preferred",
                      },
                      {
                        label: "Manual",
                        type: "radio",
                        group: "participantRequestedMethod",
                        providerDefault: "Allowed",
                        marketDemand: "Medium",
                        salesImpact: "Medium",
                        industryRating: "Allowed",
                      },
                    ],
                  },
                  {
                    label: "Military service re-amortization method",
                    children: [
                      {
                        label: "Automatic",
                        type: "radio",
                        group: "militaryServiceReamortizationMethod",
                        providerDefault: "Preferred",
                        marketDemand: "Medium",
                        salesImpact: "Medium",
                        industryRating: "Preferred",
                      },
                      {
                        label: "Manual",
                        type: "radio",
                        group: "militaryServiceReamortizationMethod",
                        providerDefault: "Allowed",
                        marketDemand: "Medium",
                        salesImpact: "Medium",
                        industryRating: "Allowed",
                      },
                    ],
                  },
                ],
              },
              {
                label: "Loan default processing is determined by",
                providerDefault: "Preferred",
                subcategories: [
                  {
                    label: "Recordkeeper",
                    providerDefault: "Preferred",
                    marketDemand: "Medium",
                    salesImpact: "Medium",
                    industryRating: "Preferred",
                  },
                  {
                    label: "Plan Sponsor",
                    providerDefault: "Allowed",
                    marketDemand: "Medium",
                    salesImpact: "Medium",
                    industryRating: "Allowed",
                  },
                ],
              },
            ],
          },
        ],
      },
    },
    advisor: {
      scopes: ["str_plan_advisor"],
      dashboard: {
        welcomeMessage: `Welcome back, ${user}`,
        overviewSubheading: `Here's an overview of your book of business as of ${currentformattedDate}`,
        alertMessage: "The market will close early today due to holiday.",
      },
      tabs: [
        { label: "My Portfolio", value: 0 },
        { label: "My Proposals", value: 1 },
        { label: "My Investments", value: 2 },
        { label: " My Opportunities", value: 3 },
      ],
      myPortfolio: {
        dashboardMetrics: {
          text: `Change vs. prior month`,
          widgetKeysInJSON: ["dashboard_metrics"],
        },
        productPerformacePieData: {
          title: "Portfolio Performance",
          subtitle: "Portfolio breakdown by market segment and plan type",
          widgetKeysInJSON: ["product_performance_pie_data"],
          defaultColors: pieDefaultColors,
          kpis: ["Market Segment", "Plan Type"],
        },
        productMomChange: {
          title: (
            <>
              Month over Month <br /> Change %
            </>
          ),
          xAxisLabel: "In Percentage",
          widgetKeysInJSON: ["product_performance_bar_data"],
        },
        productPerformaceBarData: {
          selectLabel: "Select KPI",
          bodyText1: `Products (${dataCount.horizontalBarChartData}) - `,
          kpis: ["Assets", "Plans", "Participants", "Revenue"],
          restingColor: "#3BABAB",
          selectionColor: "#117B99",
          xAxisLabel: "Assets in Millions",
          widgetKeysInJSON: ["product_performance_bar_data"],
        },
        productFlows: {
          verticalStackedBarChartData: {
            title: "Net Flows",
            subtitle:
              "Monthly asset inflows and outflows for the trailing 12 months",
            widgetKeysInJSON: ["product_flows_net_flow"],
            defaultColors: [
              "rgba(17, 123, 153, 1)",
              "rgba(255, 192, 192, 1)",
              "rgba(88, 185, 255, 1)",
              "rgba(255, 107, 107, 1)",

              "rgba(133, 93, 146, 1)",
            ],
            groupByFields: ["Month"],
            sumUpFields: [
              "Contribution",
              "Distributions",
              "New Business",
              "Lost Business",
              "Net Flow",
            ],
          },
        },
        myPlans: {
          title: "My Plans",
          filteringCriteria: ["employer", "planName", "planTypes"],
          toolbar: ["search", "newProposal", "download"],
        },
      },
      myOpportunities: {
        opportunitiesTable: {
          widgetKeysInJSON: ["opportunities"],
          filteringCriteria: ["Market Segment", "Product Offer", "Plan Type"],
          toolbar: ["search", "download"],
        },
        title: "My Opportunities",
        subtitle:
          "Services options that can reduce plan risk and complexity,  improve partipant outcomes and stengthen client relationships.",
      },
      myInvestments: {
        heroSection: {
          title: "My Active Investments",
          subtitle: "Investment details for your plans",
        },
        investmentPieData: {
          body: "Top 5 Fund Families",
          selectLabel: "Select KPI",
          widgetKeysInJSON: ["investments_pie_data"],
          defaultColors: pieDefaultColors,
          kpis: ["Assets", "Participants", "Plans"],
        },
        investmentBarData: {
          bodyText1: `Investments (${dataCount.horizontalBarChartData}) - `,
          kpis: ["Assets", "Plans", "Participants"],
          restingColor: "#3BABAB",
          selectionColor: "#117B99",
          xAxisLabel: "Assets in Millions",
          widgetKeysInJSON: ["investments_bar_data"],
        },
        investmentsTable: {
          title: `My Investment List (${dataCount.investmentMaster})`,
          subtitle: "A list of the investments used by your plans",

          widgetKeysInJSON: ["investments_table_data"],
          toolbar: ["search", "download"],
        },
      },
      propsaltabs: [
        { label: "Ingest Documents", value: "ingest" },
        { label: "Select Offer", value: "selectoffer" },
        { label: "Edit Proposal", value: "editproposal" },
        { label: "Review & Submit", value: "reviewsubmit" },
      ],
      productPlanBuild: {
        backgroundInfo: [
          {
            label: "Plan Name",
            key: "planName",
            type: "text",
          },
          { label: "Plan Description", key: "planDescription", type: "text" },
          { label: "Employer", key: "employer", type: "text" },
          { label: "Market Segment", key: "marketSegment", type: "text" },
          {
            label: "Number of Participants",
            key: "noOfParticipants",
            type: "number",
          },
          { label: "Total Plan Assets", key: "aum", type: "money" },
          { label: "Average Balance", key: "avgBalance", type: "money" },
          { label: "Plan Type", key: "planType", type: "text" },
          { label: "Industry", key: "industry", type: "text" },
          { label: "Advisor Type", key: "advisorType", type: "text" },
          { label: "Win Probability", key: "winProbability", type: "text" },
          {
            label: "Current Plan Document Type",
            key: "currentPlanDocumentType",
            type: "text",
          },
          {
            label: "Proposed Plan Document Type",
            key: "proposedPlanDocumentType",
            type: "text",
          },
        ],
        padenDropdownFields: [
          "Preferred",
          "Allowed",
          "Declined",
          "Exception",
          "Not Available",
        ],
        moneySources: [
          {
            moneySourceClassifier: "Employee Deferral Sources",
            moneySourceClassifierId: "employeeDeferralSources",
            moneySourceCategories: [
              {
                category: "Pre-Tax",
                categoryId: "preTax",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label: "Catch Up Contributions",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Email: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "Deferral Changes",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Email: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "In-Person": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "Participant Max Contributions",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Email: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                ],
              },
              {
                category: "After-Tax",
                categoryId: "afterTax",
                providerDefault: "Allowed",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Allowed",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label: "Catch Up Contributions",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "Deferral Changes",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Email: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "In-Person": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "After Tax Reclassification",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Exception",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Exception",
                      },
                      Email: {
                        providerDefault: "Exception",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Exception",
                      },
                      Phone: {
                        providerDefault: "Exception",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Exception",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                    children: [
                      {
                        label: "Participant Elected - opt-out",
                        type: "radio",
                        group: "participantElected",
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                        ancillaryFeeApplicable: true,
                        tooltipText: {
                          Paper: {
                            providerDefault: "Exception",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Exception",
                          },
                          Web: {
                            providerDefault: "Preferred",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Preferred",
                          },
                          "Mobile App": {
                            providerDefault: "Preferred",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          "In-Person": {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          "Plan-Sponsor": {
                            providerDefault: "Not Available",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Preferred",
                          },
                        },
                      },
                      {
                        label: "Participant Elected - opt-in",
                        type: "radio",
                        group: "participantElected",
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                        ancillaryFeeApplicable: false,
                        tooltipText: {
                          Paper: {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          Web: {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Preferred",
                          },
                          "Mobile App": {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          "In-Person": {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          "Plan-Sponsor": {
                            providerDefault: "Preferred",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Preferred",
                          },
                        },
                      },
                    ],
                  },
                  {
                    label: "Participant Maximum Contributions",
                    providerDefault: "Allowed",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                ],
              },
              {
                category: "Roth",
                categoryId: "roth",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label: "Catch Up Contributions Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "Deferral Changes Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "In-Person": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "In Plan Roth Conversions Allowed",
                    providerDefault: "Allowed",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Secure Email": {
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                ],
              },
              {
                category: "Emergency Savings Account (RESA)",
                categoryId: "resa",
                providerDefault: "Allowed",
                marketDemand: "High",
                salesImpact: "High",
                industryRating: "Allowed",
                subCategories: [],
                ancillaryFeeApplicable: true,
              },
            ],
          },
          {
            moneySourceClassifier: "Employer Sources",
            moneySourceClassifierId: "employerSources",
            moneySourceCategories: [
              {
                category: "Company Match",
                categoryId: "companyMatch",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label: "True Up Calculations Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                  },
                  {
                    label: "Roth Treatment of Company Match Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                  },
                ],
              },
              {
                category: "Non-elective Contributions",
                categoryId: "nonElectiveContribution",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label:
                      "Roth Treatment on Non-Elective Contributions Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Exception",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                ],
              },
              {
                category: "Profit Sharing",
                categoryId: "profitSharing",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [],
              },
            ],
          },
          {
            moneySourceClassifier: "Rollover In",
            moneySourceClassifierId: "rolloverIn",
            moneySourceCategories: [
              {
                category: "Rollover In",
                categoryId: "rolloverIn",
                providerDefault: "Preferred",
                marketDemand: "High",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: true,
                subCategories: [
                  {
                    label: "Rollover in allowed from plan",
                    providerDefault: "Allowed",
                    marketDemand: "High",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: true,
                    children: [
                      {
                        label:
                          "401(a) or 403 (b) qualified plan balances (includes 401k)",
                        type: "checkbox",
                        group: "rolloverIAllowedfromPlan",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "403(b) annuity contracts",
                        type: "checkbox",
                        group: "rolloverInAllowedFromPlan",
                        providerDefault: "Exception",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "457 eligible",
                        type: "checkbox",
                        group: "rolloverInAllowedFromPlan",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                    ],
                  },
                  {
                    label: "Rollover in allowed from money sources",
                    providerDefault: "Allowed",
                    marketDemand: "High",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: true,
                    children: [
                      {
                        label: "Designated Roth accounts",
                        type: "checkbox",
                        group: "rolloverInAllowedFromPlan",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "After Tax employee contributions",
                        type: "checkbox",
                        group: "rolloverInAllowedFromPlan",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                    ],
                  },
                  {
                    label: "Rollover in method allowed",
                    providerDefault: "Preferred",
                    marketDemand: "High",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: true,
                    children: [
                      {
                        label: "Direct rollover (roll in) from qualified plan",
                        type: "checkbox",
                        group: "rolloverinMethodAllowed",
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label:
                          "Participant rollover (roll in) from another plan",
                        type: "checkbox",
                        group: "rolloverinMethodAllowed",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                    ],
                  },
                  {
                    label: "Rollover in approvals are completed by",
                    providerDefault: "Allowed",
                    marketDemand: "High",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: true,
                    children: [
                      {
                        label: "Recordkeeper",
                        type: "radio",
                        group: "rolloverinApprovalsCompletedBy",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "Plan Sponsor",
                        type: "radio",
                        group: "rolloverinApprovalsCompletedBy",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "TPA or designated 3rd party ",
                        type: "radio",
                        group: "rolloverinApprovalsCompletedBy",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        loans: [
          {
            loanProvisions: "Loans Allowed",
            providerDefault: "Preferred",
            marketDemand: "Medium",
            salesImpact: "Medium",
            industryRating: "Allowed",
            loanProvisionTypes: [
              {
                label: "General Purpose",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Allowed",
              },
              {
                label: "Hardship",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Allowed",
              },
              {
                label: "Primary Residence",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Allowed",
              },
              {
                label: "Federally Declared Disaster",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Allowed",
              },
            ],
            categories: [
              {
                label: "Spousal consent required to take a loan",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Preferred",
              },
              {
                label: "Loan Modeling allowed",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Preferred",
              },
              {
                label: "Loan Refinancing allowed",
                providerDefault: "Allowed",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Allowed",
              },
              {
                label: "Loan Re-Amortization Allowed",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Preferred",
                group: "payFrequencyChangeMethod",
                subcategories: [
                  {
                    label: "Pay frequency change method",
                    children: [
                      {
                        label: "Automatic",
                        type: "radio",
                        group: "payFrequencyChangeMethod",
                        providerDefault: "Preferred",
                        marketDemand: "Medium",
                        salesImpact: "Medium",
                        industryRating: "Preferred",
                      },
                      {
                        label: "Manual",
                        type: "radio",
                        group: "payFrequencyChangeMethod",
                        providerDefault: "Allowed",
                        marketDemand: "Medium",
                        salesImpact: "Medium",
                        industryRating: "Allowed",
                      },
                    ],
                  },
                  {
                    label: "Participant requested re-amortization method",
                    children: [
                      {
                        label: "Automatic",
                        type: "radio",
                        group: "participantRequestedMethod",
                        providerDefault: "Preferred",
                        marketDemand: "Medium",
                        salesImpact: "Medium",
                        industryRating: "Preferred",
                      },
                      {
                        label: "Manual",
                        type: "radio",
                        group: "participantRequestedMethod",
                        providerDefault: "Allowed",
                        marketDemand: "Medium",
                        salesImpact: "Medium",
                        industryRating: "Allowed",
                      },
                    ],
                  },
                  {
                    label: "Military service re-amortization method",
                    children: [
                      {
                        label: "Automatic",
                        type: "radio",
                        group: "militaryServiceReamortizationMethod",
                        providerDefault: "Preferred",
                        marketDemand: "Medium",
                        salesImpact: "Medium",
                        industryRating: "Preferred",
                      },
                      {
                        label: "Manual",
                        type: "radio",
                        group: "militaryServiceReamortizationMethod",
                        providerDefault: "Allowed",
                        marketDemand: "Medium",
                        salesImpact: "Medium",
                        industryRating: "Allowed",
                      },
                    ],
                  },
                ],
              },
              {
                label: "Loan default processing is determined by",
                providerDefault: "Preferred",
                subcategories: [
                  {
                    label: "Recordkeeper",
                    providerDefault: "Preferred",
                    marketDemand: "Medium",
                    salesImpact: "Medium",
                    industryRating: "Preferred",
                  },
                  {
                    label: "Plan Sponsor",
                    providerDefault: "Allowed",
                    marketDemand: "Medium",
                    salesImpact: "Medium",
                    industryRating: "Allowed",
                  },
                ],
              },
            ],
          },
        ],
        temp: [
          "Employer contribution calculations",
          "Loan administration/processing",
          "Participant education services",
        ],
      },
      proposalIngestMenus: [
        {
          key: "ingestdocuments",
          icon: (
            <img
              src={ingesticon}
              alt="Ingest Documents"
              width="16"
              height="16"
            />
          ),
          label: "Ingest Documents",
        },
        {
          key: "missingdata",
          icon: (
            <img
              src={missingdataicon}
              alt="Missing Data"
              width="16"
              height="16"
            />
          ),
          label: "Missing Data",
        },
        {
          key: "requestchanges",
          icon: (
            <img
              src={requesticon}
              alt="Request Changes"
              width="16"
              height="16"
            />
          ),
          label: "Request Changes",
        },
      ],
      selectOfferMenus: [
        {
          key: "pickoffer",
          icon: (
            <img
              src={ingesticon}
              alt="View Adjustments"
              width="16"
              height="16"
            />
          ),
          label: "Pick Offer",
        },
        {
          key: "viewAdjustments",
          icon: (
            <img
              src={ingesticon}
              alt="View Adjustments"
              width="16"
              height="16"
            />
          ),
          label: "Differences",
        },
      ],
      editProposalMenus: [
        {
          key: "Background",
          icon: (
            <img
              src={BackgroundInfoIcon}
              alt="Background Info"
              width="16"
              height="16"
            />
          ),
          label: "Background",
        },
        {
          key: "planprovisions",
          icon: (
            <img
              src={PlanProvisionIcon}
              alt="Plan Provisions"
              width="16"
              height="16"
            />
          ),
          label: "Plan Provisions",
          children: [
            {
              key: "moneySources",
              icon: (
                <img
                  src={MoneySourcesIcon}
                  alt="Money Sources"
                  width="16"
                  height="16"
                />
              ),
              label: "Money Sources",
            },
            {
              key: "enrollment",
              icon: (
                <img
                  src={EnrollmentIcon}
                  alt="Enrollment"
                  width="16"
                  height="16"
                />
              ),
              label: "Enrollment",
            },
            {
              key: "eligibility",
              icon: (
                <img
                  src={EligibilityIcon}
                  alt="Eligibility"
                  width="16"
                  height="16"
                />
              ),
              label: "Eligibility",
            },
            {
              key: "contributions",
              icon: (
                <img
                  src={ContributionsIcon}
                  alt="Contributions"
                  width="16"
                  height="16"
                />
              ),
              label: "Contributions",
            },
            {
              key: "withdrawals",
              icon: (
                <img
                  src={WithdrawalsIcon}
                  alt="Withdrawals"
                  width="16"
                  height="16"
                />
              ),
              label: "Withdrawals",
            },
            {
              key: "loans",
              icon: <img src={LoansIcon} alt="Loans" width="16" height="16" />,
              label: "Loans",
            },
            {
              key: "vesting",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="none"
                >
                  <path
                    d="M4.21053 6.76388H9.26316V5.07967C9.26316 4.37791 9.01754 3.78142 8.52632 3.29019C8.03509 2.79897 7.4386 2.55335 6.73684 2.55335C6.03509 2.55335 5.4386 2.79897 4.94737 3.29019C4.45614 3.78142 4.21053 4.37791 4.21053 5.07967V6.76388ZM11.7895 19.3955C10.6246 19.3955 9.63158 18.9849 8.81053 18.1639C7.98947 17.3428 7.57895 16.3498 7.57895 15.1849C7.57895 14.02 7.98947 13.027 8.81053 12.206C9.63158 11.3849 10.6246 10.9744 11.7895 10.9744C12.9544 10.9744 13.9474 11.3849 14.7684 12.206C15.5895 13.027 16 14.02 16 15.1849C16 16.3498 15.5895 17.3428 14.7684 18.1639C13.9474 18.9849 12.9544 19.3955 11.7895 19.3955ZM13.1789 17.1639L13.7684 16.5744L12.2105 15.0165V12.6586H11.3684V15.3534L13.1789 17.1639ZM6.94737 18.5534H1.68421C1.22105 18.5534 0.824561 18.3884 0.494737 18.0586C0.164912 17.7288 0 17.3323 0 16.8691V8.44809C0 7.98493 0.164912 7.58844 0.494737 7.25861C0.824561 6.92879 1.22105 6.76388 1.68421 6.76388H2.52632V5.07967C2.52632 3.91475 2.93684 2.92177 3.75789 2.10072C4.57895 1.27967 5.57193 0.869141 6.73684 0.869141C7.90175 0.869141 8.89474 1.27967 9.71579 2.10072C10.5368 2.92177 10.9474 3.91475 10.9474 5.07967V6.76388H11.7895C12.2526 6.76388 12.6491 6.92879 12.9789 7.25861C13.3088 7.58844 13.4737 7.98493 13.4737 8.44809V9.54282C13.193 9.44458 12.9123 9.37791 12.6316 9.34282C12.3509 9.30774 12.0702 9.29019 11.7895 9.29019C10.1474 9.29019 8.75439 9.86212 7.61053 11.006C6.46667 12.1498 5.89474 13.5428 5.89474 15.1849C5.89474 15.7884 5.98947 16.3744 6.17895 16.9428C6.36842 17.5112 6.62456 18.0481 6.94737 18.5534Z"
                    fill="#9E9E9E"
                  />
                </svg>
              ),
              label: "Vesting",
            },
          ],
        },
        {
          key: "participantServices",
          icon: (
            <img
              src={ParticipantServicesIcon}
              alt="Participant Services"
              width="16"
              height="16"
            />
          ),
          label: "Participant Services",
        },
        {
          key: "planServices",
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                d="M5.95204 15.4636C4.23975 15.0987 2.8187 14.2285 1.68888 12.8531C0.559053 11.4776 -0.00585938 9.87763 -0.00585938 8.05307C-0.00585938 5.94781 0.730983 4.15833 2.20467 2.68465C3.67835 1.21096 5.46782 0.474121 7.57309 0.474121C9.67835 0.474121 11.4678 1.21096 12.9415 2.68465C14.4152 4.15833 15.152 5.94781 15.152 8.05307C15.152 8.65658 15.0819 9.24254 14.9415 9.81096C14.8012 10.3794 14.6047 10.9162 14.352 11.4215H9.21519C8.28888 11.4215 7.50291 11.7513 6.8573 12.411C6.21168 13.0706 5.88888 13.8636 5.88888 14.7899C5.88888 14.9022 5.89239 15.0145 5.8994 15.1268C5.90642 15.239 5.92397 15.3513 5.95204 15.4636ZM9.2573 10.9162L10.4362 9.73728L8.41519 7.71623V3.84254H6.73098V8.38991L9.2573 10.9162ZM9.2573 16.4741H14.3099C14.7731 16.4741 15.1696 16.3092 15.4994 15.9794C15.8292 15.6496 15.9941 15.2531 15.9941 14.7899C15.9941 14.3268 15.8292 13.9303 15.4994 13.6004C15.1696 13.2706 14.7731 13.1057 14.3099 13.1057H9.2573C8.79414 13.1057 8.39765 13.2706 8.06783 13.6004C7.738 13.9303 7.57309 14.3268 7.57309 14.7899C7.57309 15.2531 7.738 15.6496 8.06783 15.9794C8.39765 16.3092 8.79414 16.4741 9.2573 16.4741Z"
                fill="#9E9E9E"
              />
            </svg>
          ),
          label: "Plan Services",
        },
        {
          key: "tpaservices",
          icon: (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.1941 10.4024C10.5275 10.4024 9.96081 10.1691 9.49414 9.70244C9.02747 9.23577 8.79414 8.66911 8.79414 8.00244C8.79414 7.33577 9.02747 6.76911 9.49414 6.30244C9.96081 5.83577 10.5275 5.60244 11.1941 5.60244C11.8608 5.60244 12.4275 5.83577 12.8941 6.30244C13.3608 6.76911 13.5941 7.33577 13.5941 8.00244C13.5941 8.66911 13.3608 9.23577 12.8941 9.70244C12.4275 10.1691 11.8608 10.4024 11.1941 10.4024ZM6.39414 16.0024V13.6824C6.39414 13.4024 6.46081 13.1391 6.59414 12.8924C6.72747 12.6458 6.91414 12.4491 7.15414 12.3024C7.58081 12.0491 8.03081 11.8391 8.50414 11.6724C8.97747 11.5058 9.46081 11.3824 9.95414 11.3024L11.1941 12.8024L12.4341 11.3024C12.9275 11.3824 13.4075 11.5058 13.8741 11.6724C14.3408 11.8391 14.7875 12.0491 15.2141 12.3024C15.4541 12.4491 15.6441 12.6458 15.7841 12.8924C15.9241 13.1391 15.9941 13.4024 15.9941 13.6824V16.0024H6.39414ZM4.79414 13.6824V14.4024H1.59414C1.15414 14.4024 0.777474 14.2458 0.464141 13.9324C0.150807 13.6191 -0.00585938 13.2424 -0.00585938 12.8024V1.60244C-0.00585938 1.16244 0.150807 0.785775 0.464141 0.472441C0.777474 0.159108 1.15414 0.00244141 1.59414 0.00244141H12.7941C13.2341 0.00244141 13.6108 0.159108 13.9241 0.472441C14.2375 0.785775 14.3941 1.16244 14.3941 1.60244V5.60244C13.9808 5.08244 13.5141 4.68577 12.9941 4.41244C12.4741 4.13911 11.8741 4.00244 11.1941 4.00244V3.20244H3.19414V4.80244H8.79414C8.52747 5.01577 8.28747 5.25577 8.07414 5.52244C7.86081 5.78911 7.68081 6.08244 7.53414 6.40244H3.19414V8.00244H7.19414C7.19414 8.28244 7.22414 8.55577 7.28414 8.82244C7.34414 9.08911 7.42747 9.34911 7.53414 9.60244H3.19414V11.2024H5.95414C5.59414 11.5091 5.31081 11.8791 5.10414 12.3124C4.89747 12.7458 4.79414 13.2024 4.79414 13.6824Z"
                fill="#9E9E9E"
              />
            </svg>
          ),
          label: "TPA Services",
        },
        {
          key: "investments",
          icon: (
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.20467 9.78722V3.36202H6.73098V9.78722L5.46782 8.61137L4.20467 9.78722ZM8.41519 11.0471V0.00244141H10.9415V8.52738L8.41519 11.0471ZM-0.00585938 13.9447V6.7216H2.52046V11.425L-0.00585938 13.9447ZM-0.00585938 16.0024L5.42572 10.5851L8.41519 13.1468L13.131 8.44339H11.7836V6.7636H15.9941V10.9631H14.3099V9.61924L8.4994 15.4145L5.50993 12.8528L2.35204 16.0024H-0.00585938Z"
                fill="#9E9E9E"
              />
            </svg>
          ),
          label: "Investments",
          children: [
            {
              key: "advisory",
              icon: (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.20467 9.78722V3.36202H6.73098V9.78722L5.46782 8.61137L4.20467 9.78722ZM8.41519 11.0471V0.00244141H10.9415V8.52738L8.41519 11.0471ZM-0.00585938 13.9447V6.7216H2.52046V11.425L-0.00585938 13.9447ZM-0.00585938 16.0024L5.42572 10.5851L8.41519 13.1468L13.131 8.44339H11.7836V6.7636H15.9941V10.9631H14.3099V9.61924L8.4994 15.4145L5.50993 12.8528L2.35204 16.0024H-0.00585938Z"
                    fill="#9E9E9E"
                  />
                </svg>
              ),
              label: "Advisory",
            },
            {
              key: "lineup",
              label: "Lineup",
            },
            {
              key: "mapping",
              label: "Mapping",
            },
          ],
        },
        {
          key: "pricing",
          icon: <img src={PricingIcon} alt="Pricing" width="16" height="16" />,
          label: "Pricing",
        },
      ],

      reviewProposalMenus: {
        reviewMenus: [
          {
            key: "reviewExceptions",
            icon: (
              <img
                src={exception}
                alt="Review Exceptions"
                width="16"
                height="16"
              />
            ),
            label: "Review Exceptions",
          },
          {
            key: "reviewproposal",
            icon: (
              <img src={review} alt="Review Proposal" width="16" height="16" />
            ),
            label: "Review Proposal",
          },
        ],

        menus: [
          {
            key: "Background",
            icon: (
              <img
                src={BackgroundInfoIcon}
                alt="Background Info"
                width="16"
                height="16"
              />
            ),
            label: "Background",
          },
          {
            key: "planprovisions",
            icon: (
              <img
                src={PlanProvisionIcon}
                alt="Plan Provisions"
                width="16"
                height="16"
              />
            ),
            label: "Plan Provisions",
            children: [
              {
                key: "moneySources",
                icon: (
                  <img
                    src={MoneySourcesIcon}
                    alt="Money Sources"
                    width="16"
                    height="16"
                  />
                ),
                label: "Money Sources",
              },
              {
                key: "enrollment",
                icon: (
                  <img
                    src={EnrollmentIcon}
                    alt="Enrollment"
                    width="16"
                    height="16"
                  />
                ),
                label: "Enrollment",
              },
              {
                key: "eligibility",
                icon: (
                  <img
                    src={EligibilityIcon}
                    alt="Eligibility"
                    width="16"
                    height="16"
                  />
                ),
                label: "Eligibility",
              },
              {
                key: "contributions",
                icon: (
                  <img
                    src={ContributionsIcon}
                    alt="Contributions"
                    width="16"
                    height="16"
                  />
                ),
                label: "Contributions",
              },
              {
                key: "withdrawals",
                icon: (
                  <img
                    src={WithdrawalsIcon}
                    alt="Withdrawals"
                    width="16"
                    height="16"
                  />
                ),
                label: "Withdrawals",
              },
              {
                key: "loans",
                icon: (
                  <img src={LoansIcon} alt="Loans" width="16" height="16" />
                ),
                label: "Loans",
              },
              {
                key: "vesting",
                icon: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="20"
                    viewBox="0 0 16 20"
                    fill="none"
                  >
                    <path
                      d="M4.21053 6.76388H9.26316V5.07967C9.26316 4.37791 9.01754 3.78142 8.52632 3.29019C8.03509 2.79897 7.4386 2.55335 6.73684 2.55335C6.03509 2.55335 5.4386 2.79897 4.94737 3.29019C4.45614 3.78142 4.21053 4.37791 4.21053 5.07967V6.76388ZM11.7895 19.3955C10.6246 19.3955 9.63158 18.9849 8.81053 18.1639C7.98947 17.3428 7.57895 16.3498 7.57895 15.1849C7.57895 14.02 7.98947 13.027 8.81053 12.206C9.63158 11.3849 10.6246 10.9744 11.7895 10.9744C12.9544 10.9744 13.9474 11.3849 14.7684 12.206C15.5895 13.027 16 14.02 16 15.1849C16 16.3498 15.5895 17.3428 14.7684 18.1639C13.9474 18.9849 12.9544 19.3955 11.7895 19.3955ZM13.1789 17.1639L13.7684 16.5744L12.2105 15.0165V12.6586H11.3684V15.3534L13.1789 17.1639ZM6.94737 18.5534H1.68421C1.22105 18.5534 0.824561 18.3884 0.494737 18.0586C0.164912 17.7288 0 17.3323 0 16.8691V8.44809C0 7.98493 0.164912 7.58844 0.494737 7.25861C0.824561 6.92879 1.22105 6.76388 1.68421 6.76388H2.52632V5.07967C2.52632 3.91475 2.93684 2.92177 3.75789 2.10072C4.57895 1.27967 5.57193 0.869141 6.73684 0.869141C7.90175 0.869141 8.89474 1.27967 9.71579 2.10072C10.5368 2.92177 10.9474 3.91475 10.9474 5.07967V6.76388H11.7895C12.2526 6.76388 12.6491 6.92879 12.9789 7.25861C13.3088 7.58844 13.4737 7.98493 13.4737 8.44809V9.54282C13.193 9.44458 12.9123 9.37791 12.6316 9.34282C12.3509 9.30774 12.0702 9.29019 11.7895 9.29019C10.1474 9.29019 8.75439 9.86212 7.61053 11.006C6.46667 12.1498 5.89474 13.5428 5.89474 15.1849C5.89474 15.7884 5.98947 16.3744 6.17895 16.9428C6.36842 17.5112 6.62456 18.0481 6.94737 18.5534Z"
                      fill="#9E9E9E"
                    />
                  </svg>
                ),
                label: "Vesting",
              },
            ],
          },
          {
            key: "participantServices",
            icon: (
              <img
                src={ParticipantServicesIcon}
                alt="Participant Services"
                width="16"
                height="16"
              />
            ),
            label: "Participant Services",
          },
          {
            key: "planServices",
            icon: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
              >
                <path
                  d="M5.95204 15.4636C4.23975 15.0987 2.8187 14.2285 1.68888 12.8531C0.559053 11.4776 -0.00585938 9.87763 -0.00585938 8.05307C-0.00585938 5.94781 0.730983 4.15833 2.20467 2.68465C3.67835 1.21096 5.46782 0.474121 7.57309 0.474121C9.67835 0.474121 11.4678 1.21096 12.9415 2.68465C14.4152 4.15833 15.152 5.94781 15.152 8.05307C15.152 8.65658 15.0819 9.24254 14.9415 9.81096C14.8012 10.3794 14.6047 10.9162 14.352 11.4215H9.21519C8.28888 11.4215 7.50291 11.7513 6.8573 12.411C6.21168 13.0706 5.88888 13.8636 5.88888 14.7899C5.88888 14.9022 5.89239 15.0145 5.8994 15.1268C5.90642 15.239 5.92397 15.3513 5.95204 15.4636ZM9.2573 10.9162L10.4362 9.73728L8.41519 7.71623V3.84254H6.73098V8.38991L9.2573 10.9162ZM9.2573 16.4741H14.3099C14.7731 16.4741 15.1696 16.3092 15.4994 15.9794C15.8292 15.6496 15.9941 15.2531 15.9941 14.7899C15.9941 14.3268 15.8292 13.9303 15.4994 13.6004C15.1696 13.2706 14.7731 13.1057 14.3099 13.1057H9.2573C8.79414 13.1057 8.39765 13.2706 8.06783 13.6004C7.738 13.9303 7.57309 14.3268 7.57309 14.7899C7.57309 15.2531 7.738 15.6496 8.06783 15.9794C8.39765 16.3092 8.79414 16.4741 9.2573 16.4741Z"
                  fill="#9E9E9E"
                />
              </svg>
            ),
            label: "Plan Services",
          },
          {
            key: "tpaservices",
            icon: (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.1941 10.4024C10.5275 10.4024 9.96081 10.1691 9.49414 9.70244C9.02747 9.23577 8.79414 8.66911 8.79414 8.00244C8.79414 7.33577 9.02747 6.76911 9.49414 6.30244C9.96081 5.83577 10.5275 5.60244 11.1941 5.60244C11.8608 5.60244 12.4275 5.83577 12.8941 6.30244C13.3608 6.76911 13.5941 7.33577 13.5941 8.00244C13.5941 8.66911 13.3608 9.23577 12.8941 9.70244C12.4275 10.1691 11.8608 10.4024 11.1941 10.4024ZM6.39414 16.0024V13.6824C6.39414 13.4024 6.46081 13.1391 6.59414 12.8924C6.72747 12.6458 6.91414 12.4491 7.15414 12.3024C7.58081 12.0491 8.03081 11.8391 8.50414 11.6724C8.97747 11.5058 9.46081 11.3824 9.95414 11.3024L11.1941 12.8024L12.4341 11.3024C12.9275 11.3824 13.4075 11.5058 13.8741 11.6724C14.3408 11.8391 14.7875 12.0491 15.2141 12.3024C15.4541 12.4491 15.6441 12.6458 15.7841 12.8924C15.9241 13.1391 15.9941 13.4024 15.9941 13.6824V16.0024H6.39414ZM4.79414 13.6824V14.4024H1.59414C1.15414 14.4024 0.777474 14.2458 0.464141 13.9324C0.150807 13.6191 -0.00585938 13.2424 -0.00585938 12.8024V1.60244C-0.00585938 1.16244 0.150807 0.785775 0.464141 0.472441C0.777474 0.159108 1.15414 0.00244141 1.59414 0.00244141H12.7941C13.2341 0.00244141 13.6108 0.159108 13.9241 0.472441C14.2375 0.785775 14.3941 1.16244 14.3941 1.60244V5.60244C13.9808 5.08244 13.5141 4.68577 12.9941 4.41244C12.4741 4.13911 11.8741 4.00244 11.1941 4.00244V3.20244H3.19414V4.80244H8.79414C8.52747 5.01577 8.28747 5.25577 8.07414 5.52244C7.86081 5.78911 7.68081 6.08244 7.53414 6.40244H3.19414V8.00244H7.19414C7.19414 8.28244 7.22414 8.55577 7.28414 8.82244C7.34414 9.08911 7.42747 9.34911 7.53414 9.60244H3.19414V11.2024H5.95414C5.59414 11.5091 5.31081 11.8791 5.10414 12.3124C4.89747 12.7458 4.79414 13.2024 4.79414 13.6824Z"
                  fill="#9E9E9E"
                />
              </svg>
            ),
            label: "TPA Services",
          },
          {
            key: "investments",
            icon: (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.20467 9.78722V3.36202H6.73098V9.78722L5.46782 8.61137L4.20467 9.78722ZM8.41519 11.0471V0.00244141H10.9415V8.52738L8.41519 11.0471ZM-0.00585938 13.9447V6.7216H2.52046V11.425L-0.00585938 13.9447ZM-0.00585938 16.0024L5.42572 10.5851L8.41519 13.1468L13.131 8.44339H11.7836V6.7636H15.9941V10.9631H14.3099V9.61924L8.4994 15.4145L5.50993 12.8528L2.35204 16.0024H-0.00585938Z"
                  fill="#9E9E9E"
                />
              </svg>
            ),
            label: "Investments",
            children: [
              {
                key: "advisory",
                icon: (
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.20467 9.78722V3.36202H6.73098V9.78722L5.46782 8.61137L4.20467 9.78722ZM8.41519 11.0471V0.00244141H10.9415V8.52738L8.41519 11.0471ZM-0.00585938 13.9447V6.7216H2.52046V11.425L-0.00585938 13.9447ZM-0.00585938 16.0024L5.42572 10.5851L8.41519 13.1468L13.131 8.44339H11.7836V6.7636H15.9941V10.9631H14.3099V9.61924L8.4994 15.4145L5.50993 12.8528L2.35204 16.0024H-0.00585938Z"
                      fill="#9E9E9E"
                    />
                  </svg>
                ),
                label: "Advisory",
              },
              {
                key: "lineup",
                label: "Lineup",
              },
              {
                key: "mapping",
                label: "Mapping",
              },
            ],
          },
          {
            key: "pricing",
            icon: (
              <img src={PricingIcon} alt="Pricing" width="16" height="16" />
            ),
            label: "Pricing",
          },
        ],
      },

      myProposals: {
        heroSection: {
          title: "My Active Proposals",
          subtitle: "Details of your active proposals",
          pizzaTracker: {
            title: "Status of Proposals by Win Probability",
            proposalStatus: ["Draft", "Active", "Submitted", "Approved"],
          },
          myProposalsBarChart: {
            selectLabel: "Select KPI",
            kpis: [
              { label: "Estimated Revenue", key: "avg_balance" },
              { label: "Estimated Assets", key: "aum" },
              { label: "Estimated Participants", key: "no_of_participants" },
            ],
            restingColor: "#3BABAB",
          },
        },
        myProposals: {
          myProposalsTableData: {
            proposalStatus: [
              "Draft",
              "Active",
              "Submitted",
              "Approved",
              "Accepted",
            ],
            filteringCriteria: ["employer", "planTypes"],
            toolbar: ["search", "newProposal", "download"],
          },
        },
      },
      productPlanBuildMissingData: {
        title: "Provide Missing Data",
        body: `After ingesting the documents, the following fields represent data that could not be identified or extracted. 
For us to suggest an appropriate offer, we need the following data.`,
      },

      productPlanSelectOffer: {
        selectOfferPopUp: {
          bodyTitle1: "",
          bodyText1: "You have selected product offer for the proposal",
          bodyText2: "What would you like to do next?",
          editProposalButton: "Edit Proposal",
          viewAdjustmentButton: "Summary of Differences",
          widgetKeysInJSON: ["action_item_comment_list"],
        },
      },

      productGovernance: {
        productGovernanceExceptions: {
          tabs: [
            { label: "Build/Edit Offer", value: "build" },
            { label: "Review/Submit Offer", value: "review" },
            { label: "Publish Offer", value: "publish" },
            { label: "Offer Insights", value: "insights" },
          ],
          reviewMenus: [
            {
              key: "reviewExceptions",
              icon: (
                <img
                  src={exception}
                  alt="Review Exceptions"
                  width="16"
                  height="16"
                />
              ),
              label: "Review Exceptions",
            },
            {
              key: "reviewOffer",
              icon: (
                <img src={review} alt="Review Offer" width="16" height="16" />
              ),
              label: "Review Offer",
            },
          ],
          menus: [
            {
              key: "Background",
              icon: (
                <img
                  src={BackgroundInfoIcon}
                  alt="Background Info"
                  width="16"
                  height="16"
                />
              ),
              label: "Background",
            },
            {
              key: "planprovisions",
              icon: (
                <img
                  src={PlanProvisionIcon}
                  alt="Plan Provisions"
                  width="16"
                  height="16"
                />
              ),
              label: "Plan Provisions",
              children: [
                {
                  key: "moneySources",
                  icon: (
                    <img
                      src={MoneySourcesIcon}
                      alt="Money Sources"
                      width="16"
                      height="16"
                    />
                  ),
                  label: "Money Sources",
                },
                {
                  key: "enrollment",
                  icon: (
                    <img
                      src={EnrollmentIcon}
                      alt="Enrollment"
                      width="16"
                      height="16"
                    />
                  ),
                  label: "Enrollment",
                },
                {
                  key: "eligibility",
                  icon: (
                    <img
                      src={EligibilityIcon}
                      alt="Eligibility"
                      width="16"
                      height="16"
                    />
                  ),
                  label: "Eligibility",
                },
                {
                  key: "contributions",
                  icon: (
                    <img
                      src={ContributionsIcon}
                      alt="Contributions"
                      width="16"
                      height="16"
                    />
                  ),
                  label: "Contributions",
                },
                {
                  key: "withdrawals",
                  icon: (
                    <img
                      src={WithdrawalsIcon}
                      alt="Withdrawals"
                      width="16"
                      height="16"
                    />
                  ),
                  label: "Withdrawals",
                },
                {
                  key: "loans",
                  icon: (
                    <img src={LoansIcon} alt="Loans" width="16" height="16" />
                  ),
                  label: "Loans",
                },
                {
                  key: "vesting",
                  icon: (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="none"
                    >
                      <path
                        d="M4.21053 6.76388H9.26316V5.07967C9.26316 4.37791 9.01754 3.78142 8.52632 3.29019C8.03509 2.79897 7.4386 2.55335 6.73684 2.55335C6.03509 2.55335 5.4386 2.79897 4.94737 3.29019C4.45614 3.78142 4.21053 4.37791 4.21053 5.07967V6.76388ZM11.7895 19.3955C10.6246 19.3955 9.63158 18.9849 8.81053 18.1639C7.98947 17.3428 7.57895 16.3498 7.57895 15.1849C7.57895 14.02 7.98947 13.027 8.81053 12.206C9.63158 11.3849 10.6246 10.9744 11.7895 10.9744C12.9544 10.9744 13.9474 11.3849 14.7684 12.206C15.5895 13.027 16 14.02 16 15.1849C16 16.3498 15.5895 17.3428 14.7684 18.1639C13.9474 18.9849 12.9544 19.3955 11.7895 19.3955ZM13.1789 17.1639L13.7684 16.5744L12.2105 15.0165V12.6586H11.3684V15.3534L13.1789 17.1639ZM6.94737 18.5534H1.68421C1.22105 18.5534 0.824561 18.3884 0.494737 18.0586C0.164912 17.7288 0 17.3323 0 16.8691V8.44809C0 7.98493 0.164912 7.58844 0.494737 7.25861C0.824561 6.92879 1.22105 6.76388 1.68421 6.76388H2.52632V5.07967C2.52632 3.91475 2.93684 2.92177 3.75789 2.10072C4.57895 1.27967 5.57193 0.869141 6.73684 0.869141C7.90175 0.869141 8.89474 1.27967 9.71579 2.10072C10.5368 2.92177 10.9474 3.91475 10.9474 5.07967V6.76388H11.7895C12.2526 6.76388 12.6491 6.92879 12.9789 7.25861C13.3088 7.58844 13.4737 7.98493 13.4737 8.44809V9.54282C13.193 9.44458 12.9123 9.37791 12.6316 9.34282C12.3509 9.30774 12.0702 9.29019 11.7895 9.29019C10.1474 9.29019 8.75439 9.86212 7.61053 11.006C6.46667 12.1498 5.89474 13.5428 5.89474 15.1849C5.89474 15.7884 5.98947 16.3744 6.17895 16.9428C6.36842 17.5112 6.62456 18.0481 6.94737 18.5534Z"
                        fill="#9E9E9E"
                      />
                    </svg>
                  ),
                  label: "Vesting",
                },
              ],
            },
            {
              key: "participantServices",
              icon: (
                <img
                  src={ParticipantServicesIcon}
                  alt="Participant Services"
                  width="16"
                  height="16"
                />
              ),
              label: "Participant Services",
            },
            {
              key: "planServices",
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                >
                  <path
                    d="M5.95204 15.4636C4.23975 15.0987 2.8187 14.2285 1.68888 12.8531C0.559053 11.4776 -0.00585938 9.87763 -0.00585938 8.05307C-0.00585938 5.94781 0.730983 4.15833 2.20467 2.68465C3.67835 1.21096 5.46782 0.474121 7.57309 0.474121C9.67835 0.474121 11.4678 1.21096 12.9415 2.68465C14.4152 4.15833 15.152 5.94781 15.152 8.05307C15.152 8.65658 15.0819 9.24254 14.9415 9.81096C14.8012 10.3794 14.6047 10.9162 14.352 11.4215H9.21519C8.28888 11.4215 7.50291 11.7513 6.8573 12.411C6.21168 13.0706 5.88888 13.8636 5.88888 14.7899C5.88888 14.9022 5.89239 15.0145 5.8994 15.1268C5.90642 15.239 5.92397 15.3513 5.95204 15.4636ZM9.2573 10.9162L10.4362 9.73728L8.41519 7.71623V3.84254H6.73098V8.38991L9.2573 10.9162ZM9.2573 16.4741H14.3099C14.7731 16.4741 15.1696 16.3092 15.4994 15.9794C15.8292 15.6496 15.9941 15.2531 15.9941 14.7899C15.9941 14.3268 15.8292 13.9303 15.4994 13.6004C15.1696 13.2706 14.7731 13.1057 14.3099 13.1057H9.2573C8.79414 13.1057 8.39765 13.2706 8.06783 13.6004C7.738 13.9303 7.57309 14.3268 7.57309 14.7899C7.57309 15.2531 7.738 15.6496 8.06783 15.9794C8.39765 16.3092 8.79414 16.4741 9.2573 16.4741Z"
                    fill="#9E9E9E"
                  />
                </svg>
              ),
              label: "Plan Services",
            },
            {
              key: "tpaservices",
              icon: (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.1941 10.4024C10.5275 10.4024 9.96081 10.1691 9.49414 9.70244C9.02747 9.23577 8.79414 8.66911 8.79414 8.00244C8.79414 7.33577 9.02747 6.76911 9.49414 6.30244C9.96081 5.83577 10.5275 5.60244 11.1941 5.60244C11.8608 5.60244 12.4275 5.83577 12.8941 6.30244C13.3608 6.76911 13.5941 7.33577 13.5941 8.00244C13.5941 8.66911 13.3608 9.23577 12.8941 9.70244C12.4275 10.1691 11.8608 10.4024 11.1941 10.4024ZM6.39414 16.0024V13.6824C6.39414 13.4024 6.46081 13.1391 6.59414 12.8924C6.72747 12.6458 6.91414 12.4491 7.15414 12.3024C7.58081 12.0491 8.03081 11.8391 8.50414 11.6724C8.97747 11.5058 9.46081 11.3824 9.95414 11.3024L11.1941 12.8024L12.4341 11.3024C12.9275 11.3824 13.4075 11.5058 13.8741 11.6724C14.3408 11.8391 14.7875 12.0491 15.2141 12.3024C15.4541 12.4491 15.6441 12.6458 15.7841 12.8924C15.9241 13.1391 15.9941 13.4024 15.9941 13.6824V16.0024H6.39414ZM4.79414 13.6824V14.4024H1.59414C1.15414 14.4024 0.777474 14.2458 0.464141 13.9324C0.150807 13.6191 -0.00585938 13.2424 -0.00585938 12.8024V1.60244C-0.00585938 1.16244 0.150807 0.785775 0.464141 0.472441C0.777474 0.159108 1.15414 0.00244141 1.59414 0.00244141H12.7941C13.2341 0.00244141 13.6108 0.159108 13.9241 0.472441C14.2375 0.785775 14.3941 1.16244 14.3941 1.60244V5.60244C13.9808 5.08244 13.5141 4.68577 12.9941 4.41244C12.4741 4.13911 11.8741 4.00244 11.1941 4.00244V3.20244H3.19414V4.80244H8.79414C8.52747 5.01577 8.28747 5.25577 8.07414 5.52244C7.86081 5.78911 7.68081 6.08244 7.53414 6.40244H3.19414V8.00244H7.19414C7.19414 8.28244 7.22414 8.55577 7.28414 8.82244C7.34414 9.08911 7.42747 9.34911 7.53414 9.60244H3.19414V11.2024H5.95414C5.59414 11.5091 5.31081 11.8791 5.10414 12.3124C4.89747 12.7458 4.79414 13.2024 4.79414 13.6824Z"
                    fill="#9E9E9E"
                  />
                </svg>
              ),
              label: "TPA Services",
            },
            {
              key: "investments",
              icon: (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.20467 9.78722V3.36202H6.73098V9.78722L5.46782 8.61137L4.20467 9.78722ZM8.41519 11.0471V0.00244141H10.9415V8.52738L8.41519 11.0471ZM-0.00585938 13.9447V6.7216H2.52046V11.425L-0.00585938 13.9447ZM-0.00585938 16.0024L5.42572 10.5851L8.41519 13.1468L13.131 8.44339H11.7836V6.7636H15.9941V10.9631H14.3099V9.61924L8.4994 15.4145L5.50993 12.8528L2.35204 16.0024H-0.00585938Z"
                    fill="#9E9E9E"
                  />
                </svg>
              ),
              label: "Investments",
              children: [
                {
                  key: "advisory",
                  icon: (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.20467 9.78722V3.36202H6.73098V9.78722L5.46782 8.61137L4.20467 9.78722ZM8.41519 11.0471V0.00244141H10.9415V8.52738L8.41519 11.0471ZM-0.00585938 13.9447V6.7216H2.52046V11.425L-0.00585938 13.9447ZM-0.00585938 16.0024L5.42572 10.5851L8.41519 13.1468L13.131 8.44339H11.7836V6.7636H15.9941V10.9631H14.3099V9.61924L8.4994 15.4145L5.50993 12.8528L2.35204 16.0024H-0.00585938Z"
                        fill="#9E9E9E"
                      />
                    </svg>
                  ),
                  label: "Advisory",
                },
                {
                  key: "lineup",
                  label: "Lineup",
                },
                {
                  key: "mapping",
                  label: "Mapping",
                },
              ],
            },
            {
              key: "pricing",
              icon: (
                <img src={PricingIcon} alt="Pricing" width="16" height="16" />
              ),
              label: "Pricing",
            },
          ],
        },
      },
      productOfferBuild: {
        moneySources: [
          {
            moneySourceClassifier: "Employee Deferral Sources",
            moneySourceClassifierId: "employeeDeferralSources",
            moneySourceCategories: [
              {
                category: "Pre-Tax",
                categoryId: "preTax",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label: "Catch Up Contributions",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Email: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "Deferral Changes",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Email: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "In-Person": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "Participant Max Contributions",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Email: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                ],
              },
              {
                category: "After-Tax",
                categoryId: "afterTax",
                providerDefault: "Allowed",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Allowed",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label: "Catch Up Contributions",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "Deferral Changes",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Email: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "In-Person": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "After Tax Reclassification",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Exception",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Exception",
                      },
                      Email: {
                        providerDefault: "Exception",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Exception",
                      },
                      Phone: {
                        providerDefault: "Exception",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Exception",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                    children: [
                      {
                        label: "Participant Elected - opt-out",
                        type: "radio",
                        group: "participantElected",
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                        ancillaryFeeApplicable: true,
                        tooltipText: {
                          Paper: {
                            providerDefault: "Exception",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Exception",
                          },
                          Web: {
                            providerDefault: "Preferred",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Preferred",
                          },
                          "Mobile App": {
                            providerDefault: "Preferred",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          "In-Person": {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          "Plan-Sponsor": {
                            providerDefault: "Not Available",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Preferred",
                          },
                        },
                      },
                      {
                        label: "Participant Elected - opt-in",
                        type: "radio",
                        group: "participantElected",
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                        ancillaryFeeApplicable: false,
                        tooltipText: {
                          Paper: {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          Web: {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Preferred",
                          },
                          "Mobile App": {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          "In-Person": {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          "Plan-Sponsor": {
                            providerDefault: "Preferred",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Preferred",
                          },
                        },
                      },
                    ],
                  },
                  {
                    label: "Participant Maximum Contributions",
                    providerDefault: "Allowed",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                ],
              },
              {
                category: "Roth",
                categoryId: "roth",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label: "Catch Up Contributions Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "Deferral Changes Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "In-Person": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "In Plan Roth Conversions Allowed",
                    providerDefault: "Allowed",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Secure Email": {
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                ],
              },
              {
                category: "Emergency Savings Account(RESA)",
                categoryId: "resa",
                providerDefault: "Allowed",
                marketDemand: "High",
                salesImpact: "High",
                industryRating: "Allowed",
                subCategories: [],
                ancillaryFeeApplicable: true,
              },
            ],
          },
          {
            moneySourceClassifier: "Employer Sources",
            moneySourceClassifierId: "employerSources",
            moneySourceCategories: [
              {
                category: "Company Match",
                categoryId: "companyMatch",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label: "True Up Calculations Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                  },
                  {
                    label: "Roth Treatment of Company Match Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                  },
                ],
              },
              {
                category: "Non-elective Contributions",
                categoryId: "nonElectiveContribution",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label:
                      "Roth Treatment on Non-Elective Contributions Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Exception",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                ],
              },
              {
                category: "Profit Sharing",
                categoryId: "profitSharing",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [],
              },
            ],
          },
          {
            moneySourceClassifier: "Rollover In",
            moneySourceClassifierId: "rolloverIn",
            moneySourceCategories: [
              {
                category: "Rollover In",
                categoryId: "rolloverIn",
                providerDefault: "Preferred",
                marketDemand: "High",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: true,
                subCategories: [
                  {
                    label: "Rollover in allowed from plan",
                    providerDefault: "Allowed",
                    marketDemand: "High",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: true,
                    children: [
                      {
                        label:
                          "401(a) or 403 (b) qualified plan balances (includes 401k)",
                        type: "checkbox",
                        group: "rolloverIAllowedfromPlan",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "403(b) annuity contracts",
                        type: "checkbox",
                        group: "rolloverInAllowedFromPlan",
                        providerDefault: "Exception",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "457 eligible",
                        type: "checkbox",
                        group: "rolloverInAllowedFromPlan",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                    ],
                  },
                  {
                    label: "Rollover in allowed from money sources",
                    providerDefault: "Allowed",
                    marketDemand: "High",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: true,
                    children: [
                      {
                        label: "Designated Roth accounts",
                        type: "checkbox",
                        group: "rolloverInAllowedFromPlan",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "After Tax employee contributions",
                        type: "checkbox",
                        group: "rolloverInAllowedFromPlan",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                    ],
                  },
                  {
                    label: "Rollover in method allowed",
                    providerDefault: "Preferred",
                    marketDemand: "High",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: true,
                    children: [
                      {
                        label: "Direct rollover (roll in) from qualified plan",
                        type: "checkbox",
                        group: "rolloverinMethodAllowed",
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label:
                          "Participant rollover (roll in) from another plan",
                        type: "checkbox",
                        group: "rolloverinMethodAllowed",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                    ],
                  },
                  {
                    label: "Rollover in approvals are completed by",
                    providerDefault: "Allowed",
                    marketDemand: "High",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: true,
                    children: [
                      {
                        label: "Recordkeeper",
                        type: "radio",
                        group: "rolloverinApprovalsCompletedBy",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "Plan Sponsor",
                        type: "radio",
                        group: "rolloverinApprovalsCompletedBy",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "TPA or designated 3rd party ",
                        type: "radio",
                        group: "rolloverinApprovalsCompletedBy",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      differencesTabs: [
        { label: "View Differences", value: 0 },
        { label: "Missing Data Added", value: 1 },
        { label: "Features Requested", value: 2 },
      ],
    },
    governance: {
      scopes: ["str_dashboard_governance"],
      dashboard: {
        welcomeMessage: `Welcome back, ${user}`,
        overviewSubheading: `Here’s your project overview as of  ${currentformattedDate}`,
        // alertMessage: "The market will close early today due to holiday.",
      },
      tabs: [
        { label: "Product Offers", value: 0 },
        { label: "Plan Proposals", value: "plansreview" },
      ],
      myProposalsTableData: {
        toolbar: ["search", "download"],
      },
      reviewProposalMenus: {
        reviewMenus: [
          {
            key: "reviewProposal",
            icon: (
              <img src={review} alt="Review Proposal" width="16" height="16" />
            ),
            label: "Review Proposal",
          },
          {
            key: "reviewExceptions",
            icon: (
              <img
                src={exception}
                alt="Review Exceptions"
                width="16"
                height="16"
              />
            ),
            label: "Review Exceptions",
          },
        ],
        // menus: [
        //   {
        //     key: "Background",
        //     icon: (
        //       <img
        //         src={BackgroundInfoIcon}
        //         alt="Background Info"
        //         width="16"
        //         height="16"
        //       />
        //     ),
        //     label: "Background",
        //   },
        //   {
        //     key: "planprovisions",
        //     icon: (
        //       <img
        //         src={PlanProvisionIcon}
        //         alt="Plan Provisions"
        //         width="16"
        //         height="16"
        //       />
        //     ),
        //     label: "Plan Provisions",
        //     children: [
        //       {
        //         key: "moneySources",
        //         icon: (
        //           <img
        //             src={MoneySourcesIcon}
        //             alt="Money Sources"
        //             width="16"
        //             height="16"
        //           />
        //         ),
        //         label: "Money Sources",
        //       },
        //       {
        //         key: "enrollment",
        //         icon: (
        //           <img
        //             src={EnrollmentIcon}
        //             alt="Enrollment"
        //             width="16"
        //             height="16"
        //           />
        //         ),
        //         label: "Enrollment",
        //       },
        //       {
        //         key: "eligibility",
        //         icon: (
        //           <img
        //             src={EligibilityIcon}
        //             alt="Eligibility"
        //             width="16"
        //             height="16"
        //           />
        //         ),
        //         label: "Eligibility",
        //       },
        //       {
        //         key: "contributions",
        //         icon: (
        //           <img
        //             src={ContributionsIcon}
        //             alt="Contributions"
        //             width="16"
        //             height="16"
        //           />
        //         ),
        //         label: "Contributions",
        //       },
        //       {
        //         key: "withdrawals",
        //         icon: (
        //           <img
        //             src={WithdrawalsIcon}
        //             alt="Withdrawals"
        //             width="16"
        //             height="16"
        //           />
        //         ),
        //         label: "Withdrawals",
        //       },
        //       {
        //         key: "loans",
        //         icon: (
        //           <img src={LoansIcon} alt="Loans" width="16" height="16" />
        //         ),
        //         label: "Loans",
        //       },
        //       {
        //         key: "vesting",
        //         icon: (
        //           <svg
        //             xmlns="http://www.w3.org/2000/svg"
        //             width="16"
        //             height="20"
        //             viewBox="0 0 16 20"
        //             fill="none"
        //           >
        //             <path
        //               d="M4.21053 6.76388H9.26316V5.07967C9.26316 4.37791 9.01754 3.78142 8.52632 3.29019C8.03509 2.79897 7.4386 2.55335 6.73684 2.55335C6.03509 2.55335 5.4386 2.79897 4.94737 3.29019C4.45614 3.78142 4.21053 4.37791 4.21053 5.07967V6.76388ZM11.7895 19.3955C10.6246 19.3955 9.63158 18.9849 8.81053 18.1639C7.98947 17.3428 7.57895 16.3498 7.57895 15.1849C7.57895 14.02 7.98947 13.027 8.81053 12.206C9.63158 11.3849 10.6246 10.9744 11.7895 10.9744C12.9544 10.9744 13.9474 11.3849 14.7684 12.206C15.5895 13.027 16 14.02 16 15.1849C16 16.3498 15.5895 17.3428 14.7684 18.1639C13.9474 18.9849 12.9544 19.3955 11.7895 19.3955ZM13.1789 17.1639L13.7684 16.5744L12.2105 15.0165V12.6586H11.3684V15.3534L13.1789 17.1639ZM6.94737 18.5534H1.68421C1.22105 18.5534 0.824561 18.3884 0.494737 18.0586C0.164912 17.7288 0 17.3323 0 16.8691V8.44809C0 7.98493 0.164912 7.58844 0.494737 7.25861C0.824561 6.92879 1.22105 6.76388 1.68421 6.76388H2.52632V5.07967C2.52632 3.91475 2.93684 2.92177 3.75789 2.10072C4.57895 1.27967 5.57193 0.869141 6.73684 0.869141C7.90175 0.869141 8.89474 1.27967 9.71579 2.10072C10.5368 2.92177 10.9474 3.91475 10.9474 5.07967V6.76388H11.7895C12.2526 6.76388 12.6491 6.92879 12.9789 7.25861C13.3088 7.58844 13.4737 7.98493 13.4737 8.44809V9.54282C13.193 9.44458 12.9123 9.37791 12.6316 9.34282C12.3509 9.30774 12.0702 9.29019 11.7895 9.29019C10.1474 9.29019 8.75439 9.86212 7.61053 11.006C6.46667 12.1498 5.89474 13.5428 5.89474 15.1849C5.89474 15.7884 5.98947 16.3744 6.17895 16.9428C6.36842 17.5112 6.62456 18.0481 6.94737 18.5534Z"
        //               fill="#9E9E9E"
        //             />
        //           </svg>
        //         ),
        //         label: "Vesting",
        //       },
        //     ],
        //   },
        //   {
        //     key: "participantServices",
        //     icon: (
        //       <img
        //         src={ParticipantServicesIcon}
        //         alt="Participant Services"
        //         width="16"
        //         height="16"
        //       />
        //     ),
        //     label: "Participant Services",
        //   },
        //   {
        //     key: "planServices",
        //     icon: (
        //       <svg
        //         xmlns="http://www.w3.org/2000/svg"
        //         width="16"
        //         height="17"
        //         viewBox="0 0 16 17"
        //         fill="none"
        //       >
        //         <path
        //           d="M5.95204 15.4636C4.23975 15.0987 2.8187 14.2285 1.68888 12.8531C0.559053 11.4776 -0.00585938 9.87763 -0.00585938 8.05307C-0.00585938 5.94781 0.730983 4.15833 2.20467 2.68465C3.67835 1.21096 5.46782 0.474121 7.57309 0.474121C9.67835 0.474121 11.4678 1.21096 12.9415 2.68465C14.4152 4.15833 15.152 5.94781 15.152 8.05307C15.152 8.65658 15.0819 9.24254 14.9415 9.81096C14.8012 10.3794 14.6047 10.9162 14.352 11.4215H9.21519C8.28888 11.4215 7.50291 11.7513 6.8573 12.411C6.21168 13.0706 5.88888 13.8636 5.88888 14.7899C5.88888 14.9022 5.89239 15.0145 5.8994 15.1268C5.90642 15.239 5.92397 15.3513 5.95204 15.4636ZM9.2573 10.9162L10.4362 9.73728L8.41519 7.71623V3.84254H6.73098V8.38991L9.2573 10.9162ZM9.2573 16.4741H14.3099C14.7731 16.4741 15.1696 16.3092 15.4994 15.9794C15.8292 15.6496 15.9941 15.2531 15.9941 14.7899C15.9941 14.3268 15.8292 13.9303 15.4994 13.6004C15.1696 13.2706 14.7731 13.1057 14.3099 13.1057H9.2573C8.79414 13.1057 8.39765 13.2706 8.06783 13.6004C7.738 13.9303 7.57309 14.3268 7.57309 14.7899C7.57309 15.2531 7.738 15.6496 8.06783 15.9794C8.39765 16.3092 8.79414 16.4741 9.2573 16.4741Z"
        //           fill="#9E9E9E"
        //         />
        //       </svg>
        //     ),
        //     label: "Plan Services",
        //   },
        //   {
        //     key: "tpaservices",
        //     icon: (
        //       <svg
        //         width="16"
        //         height="16"
        //         viewBox="0 0 16 16"
        //         fill="none"
        //         xmlns="http://www.w3.org/2000/svg"
        //       >
        //         <path
        //           d="M11.1941 10.4024C10.5275 10.4024 9.96081 10.1691 9.49414 9.70244C9.02747 9.23577 8.79414 8.66911 8.79414 8.00244C8.79414 7.33577 9.02747 6.76911 9.49414 6.30244C9.96081 5.83577 10.5275 5.60244 11.1941 5.60244C11.8608 5.60244 12.4275 5.83577 12.8941 6.30244C13.3608 6.76911 13.5941 7.33577 13.5941 8.00244C13.5941 8.66911 13.3608 9.23577 12.8941 9.70244C12.4275 10.1691 11.8608 10.4024 11.1941 10.4024ZM6.39414 16.0024V13.6824C6.39414 13.4024 6.46081 13.1391 6.59414 12.8924C6.72747 12.6458 6.91414 12.4491 7.15414 12.3024C7.58081 12.0491 8.03081 11.8391 8.50414 11.6724C8.97747 11.5058 9.46081 11.3824 9.95414 11.3024L11.1941 12.8024L12.4341 11.3024C12.9275 11.3824 13.4075 11.5058 13.8741 11.6724C14.3408 11.8391 14.7875 12.0491 15.2141 12.3024C15.4541 12.4491 15.6441 12.6458 15.7841 12.8924C15.9241 13.1391 15.9941 13.4024 15.9941 13.6824V16.0024H6.39414ZM4.79414 13.6824V14.4024H1.59414C1.15414 14.4024 0.777474 14.2458 0.464141 13.9324C0.150807 13.6191 -0.00585938 13.2424 -0.00585938 12.8024V1.60244C-0.00585938 1.16244 0.150807 0.785775 0.464141 0.472441C0.777474 0.159108 1.15414 0.00244141 1.59414 0.00244141H12.7941C13.2341 0.00244141 13.6108 0.159108 13.9241 0.472441C14.2375 0.785775 14.3941 1.16244 14.3941 1.60244V5.60244C13.9808 5.08244 13.5141 4.68577 12.9941 4.41244C12.4741 4.13911 11.8741 4.00244 11.1941 4.00244V3.20244H3.19414V4.80244H8.79414C8.52747 5.01577 8.28747 5.25577 8.07414 5.52244C7.86081 5.78911 7.68081 6.08244 7.53414 6.40244H3.19414V8.00244H7.19414C7.19414 8.28244 7.22414 8.55577 7.28414 8.82244C7.34414 9.08911 7.42747 9.34911 7.53414 9.60244H3.19414V11.2024H5.95414C5.59414 11.5091 5.31081 11.8791 5.10414 12.3124C4.89747 12.7458 4.79414 13.2024 4.79414 13.6824Z"
        //           fill="#9E9E9E"
        //         />
        //       </svg>
        //     ),
        //     label: "TPA Services",
        //   },
        //   {
        //     key: "investments",
        //     icon: (
        //       <svg
        //         width="16"
        //         height="16"
        //         viewBox="0 0 16 16"
        //         fill="none"
        //         xmlns="http://www.w3.org/2000/svg"
        //       >
        //         <path
        //           d="M4.20467 9.78722V3.36202H6.73098V9.78722L5.46782 8.61137L4.20467 9.78722ZM8.41519 11.0471V0.00244141H10.9415V8.52738L8.41519 11.0471ZM-0.00585938 13.9447V6.7216H2.52046V11.425L-0.00585938 13.9447ZM-0.00585938 16.0024L5.42572 10.5851L8.41519 13.1468L13.131 8.44339H11.7836V6.7636H15.9941V10.9631H14.3099V9.61924L8.4994 15.4145L5.50993 12.8528L2.35204 16.0024H-0.00585938Z"
        //           fill="#9E9E9E"
        //         />
        //       </svg>
        //     ),
        //     label: "Investments",
        //     children: [
        //       {
        //         key: "advisory",
        //         icon: (
        //           <svg
        //             width="16"
        //             height="16"
        //             viewBox="0 0 16 16"
        //             fill="none"
        //             xmlns="http://www.w3.org/2000/svg"
        //           >
        //             <path
        //               d="M4.20467 9.78722V3.36202H6.73098V9.78722L5.46782 8.61137L4.20467 9.78722ZM8.41519 11.0471V0.00244141H10.9415V8.52738L8.41519 11.0471ZM-0.00585938 13.9447V6.7216H2.52046V11.425L-0.00585938 13.9447ZM-0.00585938 16.0024L5.42572 10.5851L8.41519 13.1468L13.131 8.44339H11.7836V6.7636H15.9941V10.9631H14.3099V9.61924L8.4994 15.4145L5.50993 12.8528L2.35204 16.0024H-0.00585938Z"
        //               fill="#9E9E9E"
        //             />
        //           </svg>
        //         ),
        //         label: "Advisory",
        //       },
        //       {
        //         key: "lineup",
        //         label: "Lineup",
        //       },
        //       {
        //         key: "mapping",
        //         label: "Mapping",
        //       },
        //     ],
        //   },
        //   {
        //     key: "pricing",
        //     icon: (
        //       <img src={PricingIcon} alt="Pricing" width="16" height="16" />
        //     ),
        //     label: "Pricing",
        //   },
        // ],
      },
      productOfferBuild: {
        backgroundInfo: [
          {
            label: "Plan Name",
            key: "planName",
            type: "text",
          },
          { label: "Plan Description", key: "planDescription", type: "text" },
          { label: "Employer", key: "employer", type: "text" },
          { label: "Market Segment", key: "marketSegment", type: "text" },
          {
            label: "Number of Participants",
            key: "noOfParticipants",
            type: "number",
          },
          { label: "Total Plan Assets", key: "aum", type: "money" },
          { label: "Average Balance", key: "avgBalance", type: "money" },
          { label: "Plan Type", key: "planType", type: "text" },
          { label: "Industry", key: "industry", type: "text" },
          { label: "Advisor Type", key: "advisorType", type: "text" },
          { label: "Win Probability", key: "winProbability", type: "text" },
          {
            label: "Current Plan Document Type",
            key: "currentPlanDocumentType",
            type: "text",
          },
          {
            label: "Proposed Plan Document Type",
            key: "proposedPlanDocumentType",
            type: "text",
          },
        ],
        padenDropdownFields: [
          "Preferred",
          "Allowed",
          "Declined",
          "Exception",
          "Not Available",
        ],
        moneySources: [
          {
            moneySourceClassifier: "Employee Deferral Sources",
            moneySourceClassifierId: "employeeDeferralSources",
            moneySourceCategories: [
              {
                category: "Pre-Tax",
                categoryId: "preTax",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label: "Catch Up Contributions",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Email: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "Deferral Changes",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Email: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "In-Person": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "Participant Max Contributions",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Email: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                ],
              },
              {
                category: "After-Tax",
                categoryId: "afterTax",
                providerDefault: "Allowed",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Allowed",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label: "Catch Up Contributions",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "Deferral Changes",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Email: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "In-Person": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "After Tax Reclassification",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Exception",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Exception",
                      },
                      Email: {
                        providerDefault: "Exception",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Exception",
                      },
                      Phone: {
                        providerDefault: "Exception",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Exception",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                    children: [
                      {
                        label: "Participant Elected - opt-out",
                        type: "radio",
                        group: "participantElected",
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                        ancillaryFeeApplicable: true,
                        tooltipText: {
                          Paper: {
                            providerDefault: "Exception",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Exception",
                          },
                          Web: {
                            providerDefault: "Preferred",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Preferred",
                          },
                          "Mobile App": {
                            providerDefault: "Preferred",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          "In-Person": {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          "Plan-Sponsor": {
                            providerDefault: "Not Available",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Preferred",
                          },
                        },
                      },
                      {
                        label: "Participant Elected - opt-in",
                        type: "radio",
                        group: "participantElected",
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                        ancillaryFeeApplicable: false,
                        tooltipText: {
                          Paper: {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          Web: {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Preferred",
                          },
                          "Mobile App": {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          "In-Person": {
                            providerDefault: "Allowed",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Allowed",
                          },
                          "Plan-Sponsor": {
                            providerDefault: "Preferred",
                            marketDemand: "Low",
                            salesImpact: "Low",
                            industryRating: "Preferred",
                          },
                        },
                      },
                    ],
                  },
                  {
                    label: "Participant Maximum Contributions",
                    providerDefault: "Allowed",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                ],
              },
              {
                category: "Roth",
                categoryId: "roth",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label: "Catch Up Contributions Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "Deferral Changes Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "In-Person": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "Low",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                  {
                    label: "In Plan Roth Conversions Allowed",
                    providerDefault: "Allowed",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Secure Email": {
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "In-Person": {
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                ],
              },
              {
                category: "Emergency Savings Account (RESA)",
                categoryId: "resa",
                providerDefault: "Allowed",
                marketDemand: "High",
                salesImpact: "High",
                industryRating: "Allowed",
                subCategories: [],
                ancillaryFeeApplicable: true,
              },
            ],
          },
          {
            moneySourceClassifier: "Employer Sources",
            moneySourceClassifierId: "employerSources",
            moneySourceCategories: [
              {
                category: "Company Match",
                categoryId: "companyMatch",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label: "True Up Calculations Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                  },
                  {
                    label: "Roth Treatment of Company Match Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                  },
                ],
              },
              {
                category: "Non-elective Contributions",
                categoryId: "nonElectiveContribution",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [
                  {
                    label:
                      "Roth Treatment on Non-Elective Contributions Allowed",
                    providerDefault: "Preferred",
                    marketDemand: "Low",
                    salesImpact: "Low",
                    industryRating: "Preferred",
                    ancillaryFeeApplicable: false,
                    tooltipText: {
                      Paper: {
                        providerDefault: "Not Available",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      Web: {
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      "Mobile App": {
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                      Phone: {
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "In-Person": {
                        providerDefault: "Exception",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                      },
                      "Plan-Sponsor": {
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Preferred",
                      },
                    },
                  },
                ],
              },
              {
                category: "Profit Sharing",
                categoryId: "profitSharing",
                providerDefault: "Preferred",
                marketDemand: "Low",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: false,
                subCategories: [],
              },
            ],
          },
          {
            moneySourceClassifier: "Rollover In",
            moneySourceClassifierId: "rolloverIn",
            moneySourceCategories: [
              {
                category: "Rollover In",
                categoryId: "rolloverIn",
                providerDefault: "Preferred",
                marketDemand: "High",
                salesImpact: "Low",
                industryRating: "Preferred",
                ancillaryFeeApplicable: true,
                subCategories: [
                  {
                    label: "Rollover in allowed from plan",
                    providerDefault: "Allowed",
                    marketDemand: "High",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: true,
                    children: [
                      {
                        label:
                          "401(a) or 403 (b) qualified plan balances (includes 401k)",
                        type: "checkbox",
                        group: "rolloverIAllowedfromPlan",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "403(b) annuity contracts",
                        type: "checkbox",
                        group: "rolloverInAllowedFromPlan",
                        providerDefault: "Exception",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "457 eligible",
                        type: "checkbox",
                        group: "rolloverInAllowedFromPlan",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                    ],
                  },
                  {
                    label: "Rollover in allowed from money sources",
                    providerDefault: "Allowed",
                    marketDemand: "High",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: true,
                    children: [
                      {
                        label: "Designated Roth accounts",
                        type: "checkbox",
                        group: "rolloverInAllowedFromPlan",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "After Tax employee contributions",
                        type: "checkbox",
                        group: "rolloverInAllowedFromPlan",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                    ],
                  },
                  {
                    label: "Rollover in method allowed",
                    providerDefault: "Preferred",
                    marketDemand: "High",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: true,
                    children: [
                      {
                        label: "Direct rollover (roll in) from qualified plan",
                        type: "checkbox",
                        group: "rolloverinMethodAllowed",
                        providerDefault: "Preferred",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label:
                          "Participant rollover (roll in) from another plan",
                        type: "checkbox",
                        group: "rolloverinMethodAllowed",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                    ],
                  },
                  {
                    label: "Rollover in approvals are completed by",
                    providerDefault: "Allowed",
                    marketDemand: "High",
                    salesImpact: "Low",
                    industryRating: "Allowed",
                    ancillaryFeeApplicable: true,
                    children: [
                      {
                        label: "Recordkeeper",
                        type: "radio",
                        group: "rolloverinApprovalsCompletedBy",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "Plan Sponsor",
                        type: "radio",
                        group: "rolloverinApprovalsCompletedBy",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                      {
                        label: "TPA or designated 3rd party ",
                        type: "radio",
                        group: "rolloverinApprovalsCompletedBy",
                        providerDefault: "Allowed",
                        marketDemand: "High",
                        salesImpact: "Low",
                        industryRating: "Allowed",
                        ancillaryFeeApplicable: true,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
        loans: [
          {
            loanProvisions: "Loans Allowed",
            providerDefault: "Preferred",
            marketDemand: "Medium",
            salesImpact: "Medium",
            industryRating: "Allowed",
            loanProvisionTypes: [
              {
                label: "General Purpose",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Allowed",
              },
              {
                label: "Hardship",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Allowed",
              },
              {
                label: "Primary Residence",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Allowed",
              },
              {
                label: "Federally Declared Disaster",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Allowed",
              },
            ],
            categories: [
              {
                label: "Spousal consent required to take a loan",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Preferred",
              },
              {
                label: "Loan Modeling allowed",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Preferred",
              },
              {
                label: "Loan Refinancing allowed",
                providerDefault: "Allowed",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Allowed",
              },
              {
                label: "Loan Re-Amortization Allowed",
                providerDefault: "Preferred",
                marketDemand: "Medium",
                salesImpact: "Medium",
                industryRating: "Preferred",
                group: "payFrequencyChangeMethod",
                subcategories: [
                  {
                    label: "Pay frequency change method",
                    children: [
                      {
                        label: "Automatic",
                        type: "radio",
                        group: "payFrequencyChangeMethod",
                        providerDefault: "Preferred",
                        marketDemand: "Medium",
                        salesImpact: "Medium",
                        industryRating: "Preferred",
                      },
                      {
                        label: "Manual",
                        type: "radio",
                        group: "payFrequencyChangeMethod",
                        providerDefault: "Allowed",
                        marketDemand: "Medium",
                        salesImpact: "Medium",
                        industryRating: "Allowed",
                      },
                    ],
                  },
                  {
                    label: "Participant requested re-amortization method",
                    children: [
                      {
                        label: "Automatic",
                        type: "radio",
                        group: "participantRequestedMethod",
                        providerDefault: "Preferred",
                        marketDemand: "Medium",
                        salesImpact: "Medium",
                        industryRating: "Preferred",
                      },
                      {
                        label: "Manual",
                        type: "radio",
                        group: "participantRequestedMethod",
                        providerDefault: "Allowed",
                        marketDemand: "Medium",
                        salesImpact: "Medium",
                        industryRating: "Allowed",
                      },
                    ],
                  },
                  {
                    label: "Military service re-amortization method",
                    children: [
                      {
                        label: "Automatic",
                        type: "radio",
                        group: "militaryServiceReamortizationMethod",
                        providerDefault: "Preferred",
                        marketDemand: "Medium",
                        salesImpact: "Medium",
                        industryRating: "Preferred",
                      },
                      {
                        label: "Manual",
                        type: "radio",
                        group: "militaryServiceReamortizationMethod",
                        providerDefault: "Allowed",
                        marketDemand: "Medium",
                        salesImpact: "Medium",
                        industryRating: "Allowed",
                      },
                    ],
                  },
                ],
              },
              {
                label: "Loan default processing is determined by",
                providerDefault: "Preferred",
                subcategories: [
                  {
                    label: "Recordkeeper",
                    providerDefault: "Preferred",
                    marketDemand: "Medium",
                    salesImpact: "Medium",
                    industryRating: "Preferred",
                  },
                  {
                    label: "Plan Sponsor",
                    providerDefault: "Allowed",
                    marketDemand: "Medium",
                    salesImpact: "Medium",
                    industryRating: "Allowed",
                  },
                ],
              },
            ],
          },
        ],
        temp: [
          "Employer contribution calculations",
          "Loan administration/processing",
          "Participant education services",
        ],
      },
    },
    admin: {
      scopes: [],
      dashboard: {
        welcomeMessage: "Welcome back, Admin",
        overviewTitle: `Upload Mock Data as of ${formattedDate}`,
        overviewSubheading:
          "Use this page to upload your excel data file. Please follow required format (.xlsx) to avoid validation error",
      },
      widgets: {
        uploadContainer: {
          title: "Drag and Drop a File or Browse",
        },
        productOfferTable: {
          title: "Product Offers",
        },
        productPlanTable: {
          title: "Proposal",
        },
        aiModelUpdate: {
          title: "Current AI Model",
        },
      },
    },
  };
};
