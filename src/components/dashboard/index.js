

// // import React, { useState, useEffect } from 'react';
// // import { Row, Col, Card, Button, Table, Spin, Typography } from 'antd';
// // import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
// // import { fetchData } from '../../services/http-service'; // Adjust the path as needed
// // import moment from 'moment';
// // import DonutChart from '../charts/chart';
// // // import './HomePage.css'; // Ensure you have this CSS file for custom styles

// // const { Title } = Typography;
// // const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

// // const Dashboard = () => {
// //   const [expenses, setExpenses] = useState([]);
// //   const [investments, setInvestments] = useState([]);
// //   const [savings, setSavings] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     const fetchDataFromAPI = async () => {
// //       try {
// //         let month = moment().startOf('month').format('YYYY-MM');
// //         setLoading(true);
// //         const [expenseData, investmentData, savingData] = await Promise.all([
// //           fetchData(`/api/expenses`, { moduleCode: "expense", month: month }),
// //           fetchData(`/api/expenses`, { moduleCode: "investment", month: month }),
// //           fetchData(`/api/expenses`, { moduleCode: "saving", month: month }),
// //         ]);
// //         console.log('Expense Data:', expenseData.data);
// //         console.log('Investment Data:', investmentData.data);
// //         console.log('Saving Data:', savingData.data);
// //         setExpenses(expenseData.data);
// //         setInvestments(investmentData.data);
// //         setSavings(savingData.data);
// //       } catch (error) {
// //         console.error('Error fetching data:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchDataFromAPI();
// //   }, []);

// //   const getSummary = (data) => {
// //     return data.reduce((acc, item) => acc + item.amount, 0).toFixed(2);
// //   };

// //   const formatChartData = (data) => {
// //     let result = {}
// //     data.forEach(item => {
// //       const categoryName = _.get(item, ['category', 'name'], 'N/A');
// //       const subcategoryName = _.get(item, ['subcategory', 'name'], 'N/A');

// //       if (!result[categoryName]) {
// //         result[categoryName] = {};
// //       }

// //       if (!result[categoryName][subcategoryName]) {
// //         result[categoryName][subcategoryName] = 0;
// //       }

// //       result[categoryName][subcategoryName] += item.amount;
// //     });

// //     let formattedData = Object.entries(result).flatMap(([categoryName, subcategories]) =>
// //       Object.entries(subcategories).map(([subcategoryName, amount]) => ({
// //         category: categoryName,
// //         name: subcategoryName,
// //         value: amount
// //       }))
// //     );
// //     return formattedData;
// //   };

// //   const renderPieChart = (data) => {
// //     const chartData = formatChartData(data);
// //     console.log('Formatted Chart Data:', chartData); // Check the output here

// //     return (
// //       <ResponsiveContainer width="100%" height={400}>
// //         <DonutChart data={chartData} />
// //       </ResponsiveContainer>
// //     );
// //   };

// //   const columns = [
// //     { title: 'Category', dataIndex: 'category', key: 'category' },
// //     { title: 'Amount', dataIndex: 'amount', key: 'amount', render: text => `$${text.toFixed(2)}` },
// //     { title: 'Date', dataIndex: 'date', key: 'date' },
// //     { title: 'Comment', dataIndex: 'comment', key: 'comment' }
// //   ];

// //   return (
// //     <div className="dashboard-container">
// //       {loading ? (
// //         <div className="spinner-container">
// //           <Spin size="large" />
// //         </div>
// //       ) : (
// //         <>
// //           <Row gutter={16}>
// //             <Col span={8}>
// //               <Card title={<Title level={4}>Expenses</Title>} extra={<Button>View Details</Button>}>
// //                 <p>Total: ${getSummary(expenses)}</p>
// //                 {renderPieChart(expenses)}
// //               </Card>
// //             </Col>
// //             <Col span={8}>
// //               <Card title={<Title level={4}>Investments</Title>} extra={<Button>View Details</Button>}>
// //                 <p>Total: ${getSummary(investments)}</p>
// //                 {renderPieChart(investments)}
// //               </Card>
// //             </Col>
// //             <Col span={8}>
// //               <Card title={<Title level={4}>Savings</Title>} extra={<Button>View Details</Button>}>
// //                 <p>Total: ${getSummary(savings)}</p>
// //                 {renderPieChart(savings)}
// //               </Card>
// //             </Col>
// //           </Row>
// //           <Row gutter={16} style={{ marginTop: '20px' }}>
// //             <Col span={24}>
// //               <Card title={<Title level={4}>Detailed Data</Title>}>
// //                 <Table
// //                   title={() => 'Expenses'}
// //                   columns={columns}
// //                   dataSource={expenses}
// //                   pagination={false}
// //                   rowKey="id"
// //                   bordered
// //                 />
// //                 <Table
// //                   title={() => 'Investments'}
// //                   columns={columns}
// //                   dataSource={investments}
// //                   pagination={false}
// //                   rowKey="id"
// //                   bordered
// //                 />
// //                 <Table
// //                   title={() => 'Savings'}
// //                   columns={columns}
// //                   dataSource={savings}
// //                   pagination={false}
// //                   rowKey="id"
// //                   bordered
// //                 />
// //               </Card>
// //             </Col>
// //           </Row>
// //         </>
// //       )}
// //     </div>
// //   );
// // };

// // export default Dashboard;

// import React, { useState, useEffect } from 'react';
// import { Row, Col, Card, Button, Spin, Typography } from 'antd';
// import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
// import { fetchData } from '../../services/http-service'; // Adjust the path as needed
// import moment from 'moment';
// import _ from 'lodash';
// import DonutChart from '../charts/chart';
// // import './HomePage.css'; // Ensure you have this CSS file for custom styles

// const { Title, Paragraph } = Typography;
// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

// const Dashboard = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [investments, setInvestments] = useState([]);
//   const [savings, setSavings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDataFromAPI = async () => {
//       try {
//         let month = moment().startOf('month').format('YYYY-MM');
//         setLoading(true);
//         const [expenseData, investmentData, savingData] = await Promise.all([
//           fetchData(`/api/expenses`, { moduleCode: "expense", month: month }),
//           fetchData(`/api/expenses`, { moduleCode: "investment", month: month }),
//           fetchData(`/api/expenses`, { moduleCode: "saving", month: month }),
//         ]);
//         console.log('Expense Data:', expenseData.data);
//         console.log('Investment Data:', investmentData.data);
//         console.log('Saving Data:', savingData.data);
//         setExpenses(expenseData.data);
//         setInvestments(investmentData.data);
//         setSavings(savingData.data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDataFromAPI();
//   }, []);

//   const getSummary = (data) => {
//     return data.reduce((acc, item) => acc + item.amount, 0).toFixed(2);
//   };

//   const formatChartData = (data) => {
//     let result = {};
//     data.forEach(item => {
//       const categoryName = _.get(item, ['category', 'name'], 'N/A');
//       const subcategoryName = _.get(item, ['subcategory', 'name'], 'N/A');

//       if (!result[categoryName]) {
//         result[categoryName] = {};
//       }

//       if (!result[categoryName][subcategoryName]) {
//         result[categoryName][subcategoryName] = 0;
//       }

//       result[categoryName][subcategoryName] += item.amount;
//     });

//     let formattedData = Object.entries(result).flatMap(([categoryName, subcategories]) =>
//       Object.entries(subcategories).map(([subcategoryName, amount]) => ({
//         category: categoryName,
//         name: subcategoryName,
//         value: amount
//       }))
//     );

//     return formattedData;
//   };

//   const renderTopCategories = (data, categoryTitle) => {
//     const chartData = formatChartData(data);
//     const sortedData = chartData.sort((a, b) => b.value - a.value);
//     const top5Data = sortedData.slice(0, 5);

//     return (
//       <Card title={<Title level={4}>{categoryTitle}</Title>}>
//         <Paragraph>Total: ${getSummary(data)}</Paragraph>
//         <ul>
//           {top5Data.map((item, index) => (
//             <li key={index}>{item.name}: ${item.value.toFixed(2)}</li>
//           ))}
//         </ul>
//         <ResponsiveContainer width="100%" height={300}>
//           <DonutChart data={top5Data} />
//         </ResponsiveContainer>
//       </Card>
//     );
//   };

//   return (
//     <div className="dashboard-container">
//       {loading ? (
//         <div className="spinner-container">
//           <Spin size="large" />
//         </div>
//       ) : (
//         <>
//           <Row gutter={16}>
//             <Col span={2}>
//               {renderTopCategories(expenses, 'Expenses')}
//             </Col>

//           </Row>
//           <Row gutter={16}>

//             <Col span={24}>
//               {renderTopCategories(investments, 'Investments')}
//             </Col>

//           </Row>
//           <Row gutter={16}>
//             <Col span={24}>
//               {renderTopCategories(savings, 'Savings')}
//             </Col>
//           </Row>
//         </>
//       )}
//     </div>
//   );
// };

// export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Spin, Typography, Table } from 'antd';
import { ResponsiveContainer } from 'recharts';
import { fetchData } from '../../services/http-service'; // Adjust the path as needed
import moment from 'moment';
import _ from 'lodash';
import DonutChart from '../charts/chart';
// import './HomePage.css'; // Ensure you have this CSS file for custom styles

const { Title, Paragraph } = Typography;

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [savings, setSavings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataFromAPI = async () => {
      try {
        let month = moment().startOf('month').format('YYYY-MM');
        setLoading(true);
        const [expenseData, investmentData, savingData] = await Promise.all([
          fetchData(`/api/expenses`, { moduleCode: "expense", month: month }),
          fetchData(`/api/expenses`, { moduleCode: "investment", month: month }),
          fetchData(`/api/expenses`, { moduleCode: "saving", month: month }),
        ]);
        setExpenses(expenseData.data);
        setInvestments(investmentData.data);
        setSavings(savingData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDataFromAPI();
  }, []);

  const getSummary = (data) => {
    return data.reduce((acc, item) => acc + item.amount, 0).toFixed(2);
  };

  const formatChartData = (data) => {
    let result = {};
    data.forEach(item => {
      const categoryName = _.get(item, ['category', 'name'], 'N/A');
      const subcategoryName = _.get(item, ['subcategory', 'name'], 'N/A');

      if (!result[categoryName]) {
        result[categoryName] = {};
      }

      if (!result[categoryName][subcategoryName]) {
        result[categoryName][subcategoryName] = 0;
      }

      result[categoryName][subcategoryName] += item.amount;
    });

    let formattedData = Object.entries(result).flatMap(([categoryName, subcategories]) =>
      Object.entries(subcategories).map(([subcategoryName, amount]) => ({
        category: categoryName,
        name: subcategoryName,
        value: amount
      }))
    );

    return formattedData;
  };

  const renderTopCategories = (data, categoryTitle) => {
    const chartData = formatChartData(data);
    const sortedData = chartData.sort((a, b) => b.value - a.value);
    const top5Data = sortedData.slice(0, 5);

    // Define columns for the table
    const columns = [
      { title: 'Category', dataIndex: 'name', key: 'name' },
      { title: 'Amount', dataIndex: 'value', key: 'value', render: text => `₹${text.toFixed(2)}` }
    ];

    // Prepare table data
    const tableData = top5Data.map(item => ({
      key: item.name,
      name: item.name,
      value: item.value
    }));

    return (
      <Card title={<Title level={4}>{categoryTitle}</Title>} >
        <Row gutter={16}>
          <Col span={12}>
            <Paragraph>Total: ₹{getSummary(data)}</Paragraph>
            <Table
              columns={columns}
              dataSource={tableData}
              pagination={false}
              rowKey="key"
              bordered
            />
          </Col>
          <Col span={12}>
            <ResponsiveContainer width="100%" height={450}>
              <DonutChart data={top5Data} />
            </ResponsiveContainer>
          </Col>
        </Row>
      </Card>
    );
  };

  return (
    <div className="dashboard-container">
      {loading ? (
        <div className="spinner-container">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <Row gutter={16} style={{ marginBottom: '20px' }}>
            <Col span={24}>
              {renderTopCategories(expenses, 'Expenses')}
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: '20px' }}>
            <Col span={24}>
              {renderTopCategories(investments, 'Investments')}
            </Col>
          </Row>
          <Row gutter={16} style={{ marginBottom: '20px' }}>
            <Col span={24}>
              {renderTopCategories(savings, 'Savings')}
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default Dashboard;
