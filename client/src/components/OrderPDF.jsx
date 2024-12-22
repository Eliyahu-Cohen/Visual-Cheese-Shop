// import React from "react";
// import {
//   Page,
//   Text,
//   View,
//   Document,
//   StyleSheet,
//   Font,
// } from "@react-pdf/renderer";
// import AssistantRegular from "../font/Assistant/Assistant-VariableFont_wght.ttf";

// // רישום הגופן
// Font.register({
//   family: "Assistant",
//   src: AssistantRegular,
// });

// // יצירת סגנונות
// const styles = StyleSheet.create({
//   page: {
//     padding: 30,
//     fontSize: 12,
//     direction: "rtl",
//     fontFamily: "Assistant",
//     backgroundColor: "#f8f9fa",
//   },
//   header: {
//     marginBottom: 20,
//     textAlign: "center",
//     padding: 10,
//     backgroundColor: "#4CAF50",
//     color: "white",
//     borderRadius: 5,
//   },
//   section: {
//     marginBottom: 15,
//     padding: 10,
//     border: "1px solid #ddd",
//     borderRadius: 5,
//     backgroundColor: "white",
//   },
//   table: {
//     width: "100%",
//     marginTop: 20,
//     borderCollapse: "collapse",
//   },
//   tableHeader: {
//     flexDirection: "row",
//     backgroundColor: "#f0f0f0",
//     borderBottom: "1px solid #ccc",
//     padding: 5,
//   },
//   tableRow: {
//     flexDirection: "row",
//     borderBottom: "1px solid #ccc",
//     paddingBottom: 5,
//   },
//   tableCell: {
//     flex: 1,
//     padding: 5,
//     textAlign: "right",
//   },
//   footer: {
//     marginTop: 30,
//     textAlign: "center",
//     fontSize: 10,
//     color: "#666",
//   },
//   totalSection: {
//     marginTop: 15,
//     padding: 10,
//     backgroundColor: "#e9ecef",
//     borderRadius: 5,
//   },
// });

// // קומפוננטת PDF
// const OrderPDF = ({ orderData }) => (
//   <Document>
//     <Page size="A4" style={styles.page}>
//       <View style={styles.header}>
//         <Text>דף הזמנה</Text>
//       </View>

//       <View style={styles.section}>
//         <Text>שם המזמין: {orderData.username || "לא זמין"}</Text>
//         <Text>טלפון: {orderData.phone || "לא זמין"}</Text>
//         <Text>תאריך הזמנה: {orderData.orderDate || "לא זמין"}</Text>
//         <Text>
//           סה"כ לתשלום: ₪
//           {orderData.totalPrice ? orderData.totalPrice.toFixed(2) : "0.00"}
//         </Text>
//       </View>

//       <View>
//         <Text>פרטי המוצרים:</Text>
//         <View style={styles.table}>
//           <View style={styles.tableHeader}>
//             <Text style={styles.tableCell}>שם המוצר</Text>
//             <Text style={styles.tableCell}>מחיר ליחידה</Text>
//             <Text style={styles.tableCell}>כמות</Text>
//             <Text style={styles.tableCell}>סה"כ</Text>
//           </View>
//           {orderData.items && orderData.items.length > 0 ? (
//             orderData.items.map((item, index) => (
//               <View key={index} style={styles.tableRow}>
//                 <Text style={styles.tableCell}>{item.name || "לא זמין"}</Text>
//                 <Text style={styles.tableCell}>
//                   ₪{item.regularPrice ? item.regularPrice.toFixed(2) : "0.00"}
//                 </Text>
//                 <Text style={styles.tableCell}>{item.quantity || "0"}</Text>
//                 <Text style={styles.tableCell}>
//                   ₪{(item.quantity * item.regularPrice).toFixed(2) || "0.00"}
//                 </Text>
//               </View>
//             ))
//           ) : (
//             <Text>אין מוצרים להצגה</Text>
//           )}
//         </View>
//       </View>

//       <View style={styles.totalSection}>
//         <Text>סה"כ ללא מע"מ: ₪{((orderData.totalPrice) * 0.82).toFixed(2)  || "0.00"}</Text>
//         <Text>מע"מ (17%): ₪{((orderData.totalPrice)*0.18).toFixed(2)  || "0.00"}</Text>
//         <Text>
//           <b>
//             סה"כ לתשלום: ₪
//             {orderData.totalPrice ? orderData.totalPrice.toFixed(2) : "0.00"}
//           </b>
//         </Text>
//       </View>

//       <View style={styles.footer}>
//         <Text>תודה רבה שבחרת בנו!</Text>
//         <Text>אפיק חדש שיווק ויזום</Text>
//       </View>
//     </Page>
//   </Document>
// );

// export default OrderPDF;

import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import AssistantRegular from "../font/Assistant/Assistant-VariableFont_wght.ttf";

// רישום הגופן
Font.register({
  family: "Assistant",
  src: AssistantRegular,
});

// יצירת סגנונות
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    direction: "rtl",
    fontFamily: "Assistant",
    backgroundColor: "#f8f9fa",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    padding: 10,
    backgroundColor: "#4CAF50",
    color: "white",
    borderRadius: 5,
  },
  section: {
    marginBottom: 15,
    padding: 10,
    border: "1px solid #ddd",
    borderRadius: 5,
    backgroundColor: "white",
  },
  table: {
    width: "100%",
    marginTop: 20,
    borderCollapse: "collapse",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f0f0f0",
    borderBottom: "1px solid #ccc",
    padding: 5,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ccc",
    paddingBottom: 5,
  },
  tableCell: {
    flex: 1,
    padding: 5,
    textAlign: "right",
  },
  footer: {
    marginTop: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#666",
  },
  totalSection: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#e9ecef",
    borderRadius: 5,
  },
});

// קומפוננטת PDF
const OrderPDF = ({ orderData, userType }) => {
  const calculateItemPrice = (item) => {
    const price =
      userType === "business" ? item.businessPrice : item.regularPrice;
    return price * (item.quantity || 1);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>דף הזמנה</Text>
        </View>

        <View style={styles.section}>
          <Text>שם המזמין: {orderData.username || "לא זמין"}</Text>
          <Text>טלפון: {orderData.phone || "לא זמין"}</Text>
          <Text>תאריך הזמנה: {orderData.orderDate || "לא זמין"}</Text>
          <Text>
            סה"כ לתשלום: ₪
            {orderData.totalPrice ? orderData.totalPrice.toFixed(2) : "0.00"}
          </Text>
        </View>

        <View>
          <Text>פרטי המוצרים:</Text>
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableCell}>שם המוצר</Text>
              <Text style={styles.tableCell}>מחיר ליחידה</Text>
              <Text style={styles.tableCell}>כמות</Text>
              <Text style={styles.tableCell}>סה"כ</Text>
            </View>
            {orderData.items && orderData.items.length > 0 ? (
              orderData.items.map((item, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{item.name || "לא זמין"}</Text>
                  <Text style={styles.tableCell}>
                    ₪
                    {(userType === "business"
                      ? item.businessPrice
                      : item.regularPrice
                    ).toFixed(2)}
                  </Text>
                  <Text style={styles.tableCell}>{item.quantity || "0"}</Text>
                  <Text style={styles.tableCell}>
                    ₪{calculateItemPrice(item).toFixed(2)}
                  </Text>
                </View>
              ))
            ) : (
              <Text>אין מוצרים להצגה</Text>
            )}
          </View>
        </View>

        <View style={styles.totalSection}>
          <Text>
            סה"כ ללא מע"מ: ₪{((orderData.totalPrice || 0) / 1.18).toFixed(2)}
          </Text>
          <Text>
            מע"מ (18%): ₪
            {(
              (orderData.totalPrice || 0) -
              (orderData.totalPrice || 0) / 1.18
            ).toFixed(2)}
          </Text>
          <Text>
            <b>
              סה"כ לתשלום: ₪
              {orderData.totalPrice ? orderData.totalPrice.toFixed(2) : "0.00"}
            </b>
          </Text>
        </View>

        <View style={styles.footer}>
          <Text>תודה רבה שבחרת בנו!</Text>
          <Text>אפיק חדש שיווק ויזום</Text>
        </View>
      </Page>
    </Document>
  );
};

export default OrderPDF;
