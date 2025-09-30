"use client";
import dynamic from "next/dynamic";
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Font,
} from "@react-pdf/renderer";


const PDFViewer = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
    { ssr: false }
);
const PDFDownloadLink = dynamic(
    () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
    { ssr: false }
);


Font.register({
    family: "NotoSans",
    src: "/fonts/Cairo.ttf",
});



const styles = StyleSheet.create({
    page: {
        padding: 30,
        fontFamily: "NotoSans",
        fontSize: 12,
        backgroundColor: "#fafafa",
    },
    title: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 20,
    },
    table: {
        display: "table",
        width: "100%",
    },
    headerRow: {
        flexDirection: "row",
        backgroundColor: "#f1f1f1",
        padding: 6,
    },
    row: {
        flexDirection: "row",
        padding: 6,
    },
    colEnglish: {
        width: "30%",
        textAlign: "left",
        fontFamily: "NotoSans",
    },
    colValue: {
        width: "40%",
        textAlign: "left",
        fontFamily: "NotoSans",
    },
    colArabic: {
        width: "30%",
        textAlign: "right",
        direction: "rtl",
        fontFamily: "NotoSans",

    },
});

const labels = {
    name: { en: "Name", ar: "الاسم" },
    department: { en: "Department", ar: "القسم" },
    role: { en: "Role", ar: "الوظيفة" },
    joiningDate: { en: "Joining Date", ar: "تاريخ الانضمام" },
    note: { en: "Notes", ar: "ملاحظات" },
};

const MyDocument = ({ data }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Employee Report</Text>

            <View style={styles.table}>

                <View style={styles.headerRow}>
                    <Text style={styles.colEnglish}>English Label</Text>
                    <Text style={styles.colValue}>Value</Text>
                    <Text style={styles.colArabic}> التسميةلتسمية بالعربية</Text>
                </View>

                {Object.keys(labels).map((key, index) => (
                    <View
                        style={[
                            styles.row,
                            { backgroundColor: index % 2 === 0 ? "#fff" : "#f9f9f9" },
                        ]}
                        key={key}
                    >
                        <Text style={styles.colEnglish}>{labels[key].en}</Text>
                        <Text style={styles.colValue}>{data[key]}</Text>
                        <Text style={styles.colArabic}>{labels[key].ar}</Text>
                    </View>
                ))}
            </View>
        </Page>
    </Document>
);

export default function Home({ data }) {

    return (
        <div className="w-full h-screen flex flex-col bg-gray-100">
            <PDFViewer className="flex-1 w-full">
                <MyDocument data={data} />
            </PDFViewer>

            <div className="absolute bottom-8 right-8">
                <PDFDownloadLink
                    document={<MyDocument data={data} />}
                    fileName="employee-report.pdf"
                >
                    {({ loading }) => (
                        <button className="w-10 h-10 bg-gray-200 text-gray-700 rounded-full flex justify-center items-center shadow-sm hover:bg-gray-300">
                            {loading ? "..." : "⬇️"}
                        </button>
                    )}
                </PDFDownloadLink>
            </div>
        </div>
    );
}
