import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import Example from "./dropdown";
import "./dropdown_styles/style.css";
import { writeFile, utils } from "xlsx";
import { dataref } from "./firebase";
import firebase from "firebase/compat/app";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// firebase config files //////////////

const Cyient = () => {
  // database -------------------- settings ------------------
  const [alldata, setData] = useState([]);
  const [projectOpportunityName, setProjectOpportunityName] = useState("");
  const [pmName, setPmName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snapshot = await dataref.ref("data").once("value");
        const data = snapshot.val();
        if (data) {
          const dataArray = Object.values(data);
          setData(dataArray);
        }
      } catch (error) {
        console.error("Error fetching data from Firebase: ", error);
      }
    };

    fetchData();
    console.log(alldata);
  }, []);

  const handleAdd = () => {
    // Fetch the CSP value based on selected BU and IDU

    const newData = {
      BU: selectedBU || "",
      Verticle: buToVerticleMapping[selectedBU] || "",
      IDU: selectedIDU || "",
      AeroRail: aeroRailValue || "",
      CustomerGroup: customerGroupValue || "",
      AccountManager: accountManagerValue || "",
      CSP: selectedCSP || "",
      ServiceLine: selectedOptions.ServiceLine || "",
      SubService: selectedOptions.SubService || "",
      PracticeHead: selectedOptions.PracticeHead || "",
      GEO: selectedOptions.GEO || "",
      ExistingPipeline: selectedOptions["Existing/Pipeline"] || "",
      SalesStage: selectedStage || "",
      ProbabilityAdj: percentage || "",
      ProjectOpportunityName: projectOpportunityName ||  "",
      PMName: pmName ||  "",
      NatureofRevenue: selectedOptions.NatureofRevenue || "",
      OnsiteOffshore: selected_O || "",
      BillingCurrency: selectedOptions.BillingCurrency || "",
      Headcount: headcount || "",
      BillrateDocCur: BillrateDocCur || "",
      Utilization: utilization || "",
      Month: selectedMonth || "",
      WorkingDays: workingDays[selectedMonth]?.[selected_O] || "",
      HoursPerDay: hoursPerDay[selected_O] || "",
      AvailableHours: available_hours || "",
      BilledHours: Math.round(billed_hours) || "",
      ProbabilityAdjRevenue: probadjrev || "",
      PipelineRevenue: Math.round(pipeline_revenue) || "",
      PipelineRevenueInUSD: Math.round(pipeline_revenue) || "",
    };

    setData((prevData) => [...prevData, newData]);

    dataref
      .ref("data")
      .set(alldata.concat(newData))
      .then(() => {
        toast.success("Data submitted successfully");
      })
      .catch(alert);
    console.log(alldata);
  };

  // Excel File -------------------------------

  const exportToExcel = () => {
    // Prepare the data for the Excel sheet
    const sheetData = alldata.map((item) => ({
      BU: item.BU || "",
      Verticle: item.Verticle || "",
      IDU: item.IDU || "",
      AeroRail: item.AeroRail || "",
      CustomerGroup: item.CustomerGroup || "",
      AccountManager: item.AccountManager || "",
      CSP: item.CSP || "",
      ServiceLine: item.ServiceLine || "",
      SubService: item.SubService || "",
      PracticeHead: item.PracticeHead || "",
      GEO: item.GEO || "",
      ExistingPipeline: item.ExistingPipeline || "",
      SalesStage: item.SalesStage || "",
      ProbabilityAdj: item.ProbabilityAdj || "",
      ProjectOpportunityName: item.ProjectOpportunityName || "",
      PMName: item.PMName || "",
      NatureofRevenue: item.NatureofRevenue || "",
      OnsiteOffshore: item.OnsiteOffshore || "",
      BillingCurrency: item.BillingCurrency || "",
      Headcount: item.Headcount || "",
      BillrateDocCur: item.BillrateDocCur || "",
      Utilization: item.Utilization || "",
      Month: item.Month || "",
      WorkingDays: item.WorkingDays || "",
      HoursPerDay: item.HoursPerDay || "",
      AvailableHours: item.AvailableHours || "",
      BilledHours: item.BilledHours || "",
      ProbabilityAdjRevenue: item.ProbabilityAdjRevenue || "",
      PipelineRevenue: item.PipelineRevenue || "",
      PipelineRevenueInUSD: item.PipelineRevenueInUSD || "",
    }));

    // Create a new workbook and add the data to a sheet
    const workbook = utils.book_new();
    const worksheet = utils.json_to_sheet(sheetData);

    utils.book_append_sheet(workbook, worksheet, "Data");

    // Generate the Excel file
    const excelFile = writeFile(workbook, "data.xlsx", { type: "buffer" });
  };

  const [selectedBU, setSelectedBU] = useState("");
  const [selectedIDU, setSelectedIDU] = useState("");
  const [selectedCSP, setSelectedCSP] = useState("");
  const [cspOptions, setCSPOptions] = useState([]);

  const [iduOptions, setIduOptions] = useState({
    Automotive_Mobility: {
      "Off Highway Equipment": "Ramesh Kumar",
      "Industrial Equipment": "Ramesh Kumar",
      Automotive: "Ramesh Kumar",
      Automotive_Mobility: "Ramesh Kumar",
    },
    Communications: {
      "Fixed Network": "Vikram C",
      "Mobile Network": "Vikram C",
      C_U: "Vikram C",
      "Network Solutions": "Vikram C",
      Comms: "Vikram C",
      "Network Infrastructure": "Vikram C",
    },
    "Healthcare and Life Sciences": {
      "Diagnostic Imaging": "Binay Kumar",
      "In-Vitro Diagnostics": "Binay Kumar",
      Orthopaedics: "Binay Kumar",
      Cardiology: "Binay Kumar",
      Consumer: "Binay Kumar",
      MT_H: "Binay Kumar",
    },
    "Hi-Tech": {
      CGP: "Rajandrav Dayal",
      T_N: "Rajandrav Dayal",
      "Hi-Tech": "Rajandrav Dayal",
    },
    MEU: {
      Utilities: "Sakari Koivuniemi",
      Mining: "Sakari Koivuniemi",
      Energy: "Sakari Koivuniemi",
      Power: "Sakari Koivuniemi",
      "Oil & Gas": "Sakari Koivuniemi",
      Infrastructure: "Sakari Koivuniemi",
      "Heavy Engg": "Sakari Koivuniemi",
      "MEU Main": "Sakari Koivuniemi",
      CGP: "Sakari Koivuniemi",
      Chemicals: "Sakari Koivuniemi",
    },
    Semiconductor: {
      Semiconductor: "Sathish Kumar Ganesan",
    },
    Transportation: {
      "Strg Account-BT": "Sirish Karant",
      "NAM Growth Accounts": ["Gupta Kuncham", "Krishnamurthy Kodebettu"],
      "Strg Account-PW": "Gupta Kuncham",
      "EMEA & APAC Growth Account": [
        "Gupta Kuncham",
        "Krishnamurthy Kodebettu",
      ],
    },
  });

  // Vertical --------------------

  const buToVerticleMapping = {
    Transportation: "ARC",
    Communications: "ARC",
    MEU: "MEU",
    Automotive_Mobility: "NGA",
    Semiconductor: "NGA",
    "Hi-Tech": "NGA",
    "MT&H": "NGA",
    // Add more mappings here if needed
  };

  //Service Line ------------------------
  const ServiceLine = ["DIGITAL ENGINEERING AND TECHNOLOGIE"];

  //SubService ----------------------------
  const SubService = [
    "Core Digital",
    "Aftermarket Services and MRO",
    "Software Application Engineering",
    "Geospatial Enterprise Applications",
    "Global Capability Center",
    "Manufacturing Operations Management",
    "DET Consulting",
    "Enterprise Asset Management",
    "Product Life Cycle Management",
  ];

  // Practice Head ---------------------
  const PracticeHead = [
    "Vijay Anand Jaganathan",
    "Vikas Gaur",
    "Shireesh Honnahalli",
    "Sanjiv Dhupkar",
    "Yuri",
    "Amit Anand",
    "Ayan",
    "Mohan Kuladeep",
    "Sales",
    "Sriram Palleti",
  ];
  // Geo ---------------------------------

  const geo = ["INDIA", "EMEA", "APAC", "NAM"];

  // Existing/Pipeline -------------------------

  const existing_pipeline = ["Existing", "Pipeline"];

  // probabilityforpipeline --------------------

  const salesStages = {
    "Closed Won": "100",
    "Firm Forecast": "95",
    Negotiation: "80",
    Shortlisted: "70",
    "Proposal Submission": "35",
    "Qualified - Opportunity": "10",
    Lead: "5",
  };

  //Nature of Revenue ------------------------

  const NatureofRevenue = ["FTE Revenue", "Subcon Revenue", "License Revenue"];

  // Onsite or Offsore

  const Onsite_Offshore = ["onsite", "offshore"];

  // Billing Currency: ---------------------

  const BillingCurrency = [
    "INR",
    "USD",
    "EUR",
    "GBP",
    "AUD",
    "CAD",
    "CHF",
    "NZD",
    "QAR",
    "MYR",
    "BND",
    "JPY",
    "KRW",
    "ZAR",
    "AED",
    "SGD",
    "TWD",
    "HKD",
    "PLN",
    "ILS",
    "CZK",
    "SEK",
  ];
  // Month -------------------

  const workingDays = {
    "Apr-23": {
      offshore: 20,
      onsite: 20,
    },
    "May-23": {
      offshore: 22,
      onsite: 22,
    },
    "Jun-23": {
      offshore: 21,
      onsite: 22,
    },
    "Jul-23": {
      offshore: 21,
      onsite: 20,
    },
    "Aug-23": {
      offshore: 22,
      onsite: 23,
    },
    "Sep-23": {
      offshore: 20,
      onsite: 20,
    },
    "Oct-23": {
      offshore: 20,
      onsite: 22,
    },
    "Nov-23": {
      offshore: 22,
      onsite: 20,
    },
    "Dec-23": {
      offshore: 20,
      onsite: 17,
    },
    "Jan-24": {
      offshore: 22,
      onsite: 22,
    },
    "Feb-24": {
      offshore: 20,
      onsite: 20,
    },
    "Mar-24": {
      offshore: 21,
      onsite: 21,
    },
  };

  const [aeroRailValue, setAeroRailValue] = useState("");
  const [customerGroupValue, setCustomerGroupValue] = useState("");
  const [accountManagerValue, setAccountManagerValue] = useState("");

  const month = [
    "Apr-23",
    "May-23",
    "Jun-23",
    "Jul-23",
    "Aug-23",
    "Sep-23",
    "Oct-23",
    "Nov-23",
    "Dec-23",
    "Jan-24",
    "Feb-24",
    "Mar-24",
  ];

  // HoursPerDay -------------------------------

  const hoursPerDay = {
    offshore: 9,
    onsite: 8,
  };

  const [selectedStage, setSelectedStage] = useState("");
  const [percentage, setPercentage] = useState("");

  const handleSelectChange = (event) => {
    const selectedStage = event.target.value;
    setSelectedStage(selectedStage);

    // Set the corresponding percentage value
    const percentage = salesStages[selectedStage] || "";
    setPercentage(percentage);
  };

  // Select Month as well as Onsite_Offsore

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selected_O, setSelected_O] = useState("");

  const handleSelect_M_O = (name, selectedValue) => {
    if (name === "Month") {
      setSelectedMonth(selectedValue);
    } else if (name === "Onsite_Offshore") {
      setSelected_O(selectedValue);
    }
  };

  //headcount and billratdoccur and utilization ---------------------

  const [headcount, setHeadcount] = useState("");
  const [BillrateDocCur, setBillrateDocCur] = useState("");
  const [utilization, setUtilization] = useState("");

  const handleHeadcountChange = (e) => {
    setHeadcount(e.target.value);
  };

  const handleBillrateDocCurChange = (e) => {
    setBillrateDocCur(e.target.value);
  };

  const handleUtilizationChange = (e) => {
    setUtilization(e.target.value);
  };

  const [selectedOptions, setSelectedOptions] = useState({});

  const handleSelect = (arrayName, selectedOption) => {
    setSelectedCSP("");
    setSelectedOptions((prevSelectedOptions) => ({
      ...prevSelectedOptions,
      [arrayName]: selectedOption,
    }));
    console.log(selectedOptions);

    if (arrayName === "BU") {
      setSelectedIDU("");
      setSelectedCSP("");
      setSelectedBU(selectedOption);
      setCSPOptions([]);
    } else if (arrayName === "IDU") {
      setSelectedCSP("");
      setSelectedIDU(selectedOption);

      // Check if the selectedOption is an array (multiple CSP values)
      if (Array.isArray(iduOptions[selectedBU][selectedOption])) {
        // If it's an array, set the CSP options to the selectedOption array
        setCSPOptions(iduOptions[selectedBU][selectedOption]);
      } else {
        // If it's not an array, create an array with the single CSP value
        setCSPOptions([iduOptions[selectedBU][selectedOption]]);
      }
    } else if (arrayName === "CSP") {
      setSelectedCSP(selectedOption);
    }
  };

  let available_hours =
    hoursPerDay[selected_O] *
      workingDays[selectedMonth]?.[selected_O] *
      headcount || " ";

  let billed_hours =
    (hoursPerDay[selected_O] *
      workingDays[selectedMonth]?.[selected_O] *
      headcount *
      utilization) /
      100 || "";

  let probadjrev =
    Math.round((percentage * BillrateDocCur * billed_hours) / 100) || "hi";

  let pipeline_revenue = probadjrev * (100 / percentage) || "";

  console.log(buToVerticleMapping[selectedBU]);

  return (
    <div className="main_app">
      <Container fluid>
        <Row>
          <Row md={4} lg={5} sm={2} xs={1}>
            <Col>
              <Label for="BU">BU</Label>
              <Example
                options={Object.keys(iduOptions)}
                onSelect={(selectedOption) =>
                  handleSelect("BU", selectedOption)
                }
              />
            </Col>
            <Col>
              <FormGroup>
                <Label for="percentage">Probability Adj</Label>
                <Input
                  disabled
                  type="text"
                  id="percentage"
                  value={buToVerticleMapping[selectedBU]}
                />
              </FormGroup>
            </Col>
            <Col>
              <Label for="IDU">IDU</Label>
              <Example
                options={Object.keys(iduOptions[selectedBU] || {}) || []}
                onSelect={(selectedOption) =>
                  handleSelect("IDU", selectedOption)
                }
              />
            </Col>
            <Col>
              <Label for="CSP">CSP</Label>
              <Example
                options={
                  Array.isArray(iduOptions[selectedBU]?.[selectedIDU])
                    ? iduOptions[selectedBU][selectedIDU]
                    : typeof iduOptions[selectedBU]?.[selectedIDU] === "string"
                    ? [iduOptions[selectedBU][selectedIDU]]
                    : []
                }
                onSelect={(selectedOption) =>
                  handleSelect("CSP", selectedOption)
                }
              />
            </Col>

            <Col>
              <FormGroup>
                <Label for="Aero/Rail">Aero / Rail</Label>
                <Input
                  id="Aero/Rail"
                  name="Aero / Rail"
                  placeholder="with a placeholder"
                  type="text"
                  value={aeroRailValue}
                  onChange={(e) => setAeroRailValue(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="CustomerGroup">Customer Group</Label>
                <Input
                  id="CustomerGroup"
                  name="CustomerGroup"
                  placeholder="with a placeholder"
                  type="text"
                  value={customerGroupValue}
                  onChange={(e) => setCustomerGroupValue(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="AccountManager">Account Manager</Label>
                <Input
                  id="AccountManager"
                  name="AccountManager"
                  placeholder="with a placeholder"
                  type="text"
                  value={accountManagerValue}
                  onChange={(e) => setAccountManagerValue(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col>
              <Label for="ServiceLine">Service Line</Label>
              <Example
                options={ServiceLine}
                onSelect={(selectedOption) =>
                  handleSelect("ServiceLine", selectedOption)
                }
              />
            </Col>
            <Col>
              <Label for="SubService">SubService</Label>
              <Example
                options={SubService}
                onSelect={(selectedOption) =>
                  handleSelect("SubService", selectedOption)
                }
              />
            </Col>
            <Col>
              <Label for="PracticeHead">PracticeHead</Label>
              <Example
                options={PracticeHead}
                onSelect={(selectedOption) =>
                  handleSelect("PracticeHead", selectedOption)
                }
              />
            </Col>
            <Col>
              <Label for="geo">GEO</Label>
              <Example
                options={geo}
                onSelect={(selectedOption) =>
                  handleSelect("GEO", selectedOption)
                }
              />
            </Col>
            <Col>
              <Label for="existing/pipeline">Existing/Pipeline</Label>
              <Example
                options={existing_pipeline}
                onSelect={(selectedOption) =>
                  handleSelect("Existing/Pipeline", selectedOption)
                }
              />
            </Col>

            <Col>
              <FormGroup>
                <Label for="salesStage">Sales Stage</Label>
                <Input
                  type="select"
                  id="salesStage"
                  value={selectedStage}
                  onChange={handleSelectChange}
                >
                  <option value="">Select a Sales Stage</option>
                  {Object.keys(salesStages).map((stage) => (
                    <option key={stage} value={stage}>
                      {stage}
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="percentage">Probability Adj</Label>
                <Input
                  disabled
                  type="text"
                  id="percentage"
                  value={percentage}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="Project/OpportunityName">
                  Project/Opportunity Name
                </Label>
                <Input
                  id="Project/OpportunityName"
                  name="Project/OpportunityName"
                  placeholder="Project/OpportunityName"
                  type="text"
                  value={projectOpportunityName}
                  onChange={(e) => setProjectOpportunityName(e.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="PMName">PM Name</Label>
                <Input
                  id="PMName"
                  name="PMName"
                  placeholder="Enter PMName"
                  type="text"
                  value={pmName}
                  onChange={(e) => setPmName(e.target.value)}
                />
              </FormGroup>
            </Col>

            <Col>
              <Label for="NatureofRevenue">Nature of Revenue</Label>
              <Example
                options={NatureofRevenue}
                onSelect={(selectedOption) =>
                  handleSelect("NatureofRevenue", selectedOption)
                }
              />
            </Col>
            <Col>
              <Label for="Onsite_Offshore">Onsite/Offshore</Label>
              <Example
                options={Onsite_Offshore}
                onSelect={(selectedOption) =>
                  handleSelect_M_O("Onsite_Offshore", selectedOption)
                }
              />
            </Col>
            <Col>
              <Label for="BillingCurrency">Billing Currency</Label>
              <Example
                options={BillingCurrency}
                onSelect={(selectedOption) =>
                  handleSelect("BillingCurrency", selectedOption)
                }
              />
            </Col>
            <Col>
              <FormGroup>
                <Label for="headcount">Headcount</Label>
                <Input
                  id="headcount"
                  name="headcount"
                  type="number"
                  value={headcount}
                  onChange={handleHeadcountChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="BillrateDocCur">BillrateDocCur</Label>
                <Input
                  id="BillrateDocCur"
                  name="BillrateDocCur"
                  type="number"
                  value={BillrateDocCur}
                  onChange={handleBillrateDocCurChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup>
                <Label for="Utilization">Utilization (%)</Label>
                <Input
                  id="Utilization"
                  name="Utilization"
                  type="number"
                  value={utilization}
                  onChange={handleUtilizationChange}
                />
              </FormGroup>
            </Col>
            <Col>
              <Label for="Month">Month</Label>
              <Example
                options={month}
                onSelect={(selectedOption) =>
                  handleSelect_M_O("Month", selectedOption)
                }
              />
            </Col>
            <Col>
              <Label for="working_days">Working Days</Label>
              <Input
                id="working_days"
                name="working_days"
                value={workingDays[selectedMonth]?.[selected_O]}
                type="text"
              />
            </Col>
            <Col>
              <Label for="hours_day">Hours Days</Label>
              <Input
                id="hours_day"
                name="hours_day"
                value={hoursPerDay[selected_O] || ""}
                type="text"
              />
            </Col>
            <Col>
              <Label for="available_hours">Available Hours</Label>
              <Input
                id="available_hours"
                name="available_hours"
                value={available_hours}
                type="text"
              />
            </Col>
            <Col>
              <Label for="BilledHours">Billed Hours</Label>
              <Input
                id="BilledHours"
                name="BilledHours"
                value={Math.round(billed_hours)}
                type="text"
              />
            </Col>
            <Col>
              <Label for="ProbabilityAdjRevenue">
                " Probability Adj Revenue(Doc Cur) "
              </Label>
              <Input
                id="ProbabilityAdjRevenue"
                name="ProbabilityAdjRevenue"
                value={probadjrev}
                type="text"
              />
            </Col>
            <Col>
              <Label for="PipelineRevenue">Pipeline Revenue</Label>
              <Input
                id="PipelineRevenue"
                name="PipelineRevenue"
                value={Math.round(pipeline_revenue)}
                type="text"
                readOnly
              />
            </Col>
            <Col>
              <Label for="PipelineRevenueInUSD">Pipeline Revenue In USD</Label>
              <Input
                id="PipelineRevenueInUSD"
                name="PipelineRevenueInUSD"
                value={Math.round(pipeline_revenue)}
                type="text"
              />
            </Col>
          </Row>
        </Row>
      </Container>
      <Button onClick={handleAdd}>Submit</Button>
      <Button onClick={exportToExcel}>Export Excel</Button>
      <ToastContainer />
    </div>
  );
};

export default Cyient;
