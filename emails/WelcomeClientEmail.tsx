import { 
  Html, Head, Preview, Body, Container, Section, Img, Heading, Text, Button, Hr 
} from '@react-email/components';
import * as React from 'react';

interface WelcomeClientEmailProps {
  clientName: string;
  meCode?: string;
  loginUrl?: string;
}

export const WelcomeClientEmail = ({
  clientName = 'Client',
  meCode = 'NV001',
  loginUrl = 'https://nvstudio.in/login',
}: WelcomeClientEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to NV Studio! Let's grow your business together.</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>Welcome to NV Studio, {clientName}! 🎉</Heading>
        </Section>
        <Section style={bodySection}>
          <Text style={text}>
            We're thrilled to have you on board. NV Studio is dedicated to accelerating your digital growth with premium services ranging from Social Media Management to complete Video Production.
          </Text>
          <Text style={text}>
            You were registered under the agency code: <strong>{meCode}</strong>
          </Text>
          <Text style={text}>
            Log in to your Client Dashboard anytime to browse services, track real-time analytics, and activate new growth channels.
          </Text>
          <Button href={loginUrl} style={button}>
            Access Dashboard
          </Button>
          <Hr style={hr} />
          <Text style={footerText}>
            Our team is available to assist you within 24 working hours. Reply to this email if you have any questions!
          </Text>
        </Section>
        <Section style={footer}>
          <Text style={footerDisclaimer}>
            © {new Date().getFullYear()} NV Studio. A Unit of Shree Shyam Tech.<br />
            Morar, Gwalior, Madhya Pradesh - 474006
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default WelcomeClientEmail;

const main = {
  backgroundColor: '#f8fafc',
  fontFamily: '"Inter", "HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 0',
  width: '580px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
};

const header = {
  backgroundColor: '#FF6B00',
  padding: '30px 40px',
  textAlign: 'center' as const,
};

const bodySection = {
  padding: '40px',
};

const h1 = {
  color: '#ffffff',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
  textAlign: 'center' as const,
};

const text = {
  color: '#334155',
  fontSize: '16px',
  lineHeight: '26px',
  marginBottom: '20px',
};

const button = {
  backgroundColor: '#1A1A2E',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '100%',
  padding: '14px 0',
  fontWeight: 'bold',
  marginTop: '30px',
  marginBottom: '30px',
};

const hr = {
  borderColor: '#e2e8f0',
  margin: '30px 0',
};

const footerText = {
  color: '#64748b',
  fontSize: '14px',
  lineHeight: '22px',
};

const footer = {
  backgroundColor: '#f1f5f9',
  padding: '20px 40px',
  textAlign: 'center' as const,
};

const footerDisclaimer = {
  color: '#94a3b8',
  fontSize: '12px',
  lineHeight: '18px',
};
