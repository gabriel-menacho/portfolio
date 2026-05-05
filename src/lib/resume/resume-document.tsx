import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import { phoneWithBoliviaFlag } from "@/lib/phone-display";

export type ResumePdfInput = {
  name: string;
  headline: string;
  email: string;
  phone: string;
  summary: string;
  skillLines: string[];
  experiences: Array<{
    company: string;
    range: string;
    title: string;
    body: string;
    skills: string;
  }>;
  projects: Array<{ title: string; body: string; skills: string }>;
};

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 40,
    paddingVertical: 36,
    fontSize: 10,
    fontFamily: "Helvetica",
    color: "#111827",
  },
  h1: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    marginBottom: 2,
  },
  sub: {
    fontSize: 10,
    marginBottom: 10,
    color: "#374151",
  },
  section: {
    fontSize: 11,
    fontFamily: "Helvetica-Bold",
    marginTop: 12,
    marginBottom: 6,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
  company: {
    fontFamily: "Helvetica-Bold",
    fontSize: 11,
  },
  meta: {
    fontSize: 9,
    color: "#4b5563",
    marginBottom: 4,
  },
  body: {
    fontSize: 10,
    lineHeight: 1.45,
    marginBottom: 8,
  },
  skills: {
    fontSize: 9,
    color: "#374151",
    marginBottom: 10,
  },
});

export function ResumePdfDocument(props: ResumePdfInput) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        <Text style={styles.h1}>{props.name}</Text>
        <Text style={styles.sub}>
          {[
            props.headline,
            props.email,
            props.phone.trim() ? phoneWithBoliviaFlag(props.phone) : "",
          ]
            .filter(Boolean)
            .join(" · ")}
        </Text>

        <Text style={styles.section}>Summary</Text>
        <Text style={styles.body}>{props.summary || " "}</Text>

        {props.skillLines.length > 0 ? (
          <>
            <Text style={styles.section}>Technical profile</Text>
            {props.skillLines.map((line, idx) => (
              <Text key={`${idx}-${line.slice(0, 24)}`} style={styles.body}>
                {line}
              </Text>
            ))}
          </>
        ) : null}

        {props.experiences.length > 0 ? (
          <>
            <Text style={styles.section}>Experience</Text>
            {props.experiences.map((exp) => (
              <View key={`${exp.company}-${exp.range}`}>
                <Text style={styles.company}>{exp.company}</Text>
                <Text style={styles.meta}>
                  {exp.title} · {exp.range}
                </Text>
                <Text style={styles.body}>{exp.body}</Text>
                {exp.skills ? (
                  <Text style={styles.skills}>Tools: {exp.skills}</Text>
                ) : null}
              </View>
            ))}
          </>
        ) : null}

        {props.projects.length > 0 ? (
          <>
            <Text style={styles.section}>Projects</Text>
            {props.projects.map((p) => (
              <View key={p.title}>
                <Text style={styles.company}>{p.title}</Text>
                <Text style={styles.body}>{p.body}</Text>
                {p.skills ? (
                  <Text style={styles.skills}>Tools: {p.skills}</Text>
                ) : null}
              </View>
            ))}
          </>
        ) : null}
      </Page>
    </Document>
  );
}
