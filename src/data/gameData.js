import { Mail, Lock, Shield, MessageSquare, Compass, Settings } from 'lucide-react';

export const games = [
  {
    id: 'phishing-detector',
    title: 'Phishing Email Detector',
    description: 'Identify malicious emails and learn to spot phishing attempts',
    icon: Mail,
    difficulty: 'Easy',
    points: 100,
    color: 'blue',
  },
  {
    id: 'password-cracker',
    title: 'Password Strength Simulator',
    description: 'See how quickly passwords can be cracked and learn what makes them strong',
    icon: Lock,
    difficulty: 'Easy',
    points: 100,
    color: 'green',
  },
  {
    id: 'password-creator',
    title: 'Create Strong Password',
    description: 'Build the strongest password with real-time validation',
    icon: Shield,
    difficulty: 'Medium',
    points: 150,
    color: 'purple',
  },
  {
    id: 'sms-scam',
    title: 'SMS Scam Detector',
    description: 'Identify fraudulent text messages and protect yourself',
    icon: MessageSquare,
    difficulty: 'Easy',
    points: 100,
    color: 'red',
  },
  {
    id: 'security-maze',
    title: 'Security Knowledge Maze',
    description: 'Navigate the maze by answering cybersecurity questions correctly',
    icon: Compass,
    difficulty: 'Hard',
    points: 200,
    color: 'green',
  },
  {
    id: 'security-setup',
    title: 'Fix Security Setup',
    description: 'Find and fix all security vulnerabilities in the room',
    icon: Settings,
    difficulty: 'Medium',
    points: 150,
    color: 'blue',
  },
];

export const phishingEmails = [
  {
    id: 1,
    from: 'security@paypal.com',
    subject: 'Verify Your Account',
    preview: 'Your account will be suspended in 24 hours. Click here to verify.',
    body: 'Dear valued customer,\n\nWe have detected unusual activity on your account. Please verify your identity by clicking the link below:\n\nhttp://paypa1-verify.xyz/login\n\nFailure to verify within 24 hours will result in account suspension.\n\nBest regards,\nPayPal Security Team',
    isPhishing: true,
    clues: ['Suspicious URL (paypa1 instead of paypal)', 'Creates urgency', 'Generic greeting'],
  },
  {
    id: 2,
    from: 'noreply@amazon.com',
    subject: 'Your Order #12345 Has Shipped',
    preview: 'Your recent order has been shipped and is on its way.',
    body: 'Hello,\n\nYour order #12345 has been shipped via UPS. You can track your package using the tracking number: 1Z999AA10123456784\n\nExpected delivery: Dec 25, 2024\n\nThank you for shopping with Amazon!\n\nThe Amazon Team',
    isPhishing: false,
    clues: ['Legitimate domain', 'Specific details', 'Professional formatting'],
  },
  {
    id: 3,
    from: 'admin@company-it.com',
    subject: 'URGENT: Password Reset Required',
    preview: 'Your password has expired. Reset immediately.',
    body: 'Dear Employee,\n\nYour company password has expired. You must reset it immediately by clicking below:\n\nhttp://company-reset-portal.ru/reset\n\nEnter your current password and new password. This is mandatory.\n\nIT Department',
    isPhishing: true,
    clues: ['Russian domain (.ru)', 'Asks for current password', 'Unusual urgency'],
  },
  {
    id: 4,
    from: 'team@github.com',
    subject: 'Security Alert: New Login Detected',
    preview: 'A new device signed in to your GitHub account.',
    body: 'Hi there,\n\nWe noticed a new sign-in to your account from:\n\nDevice: Chrome on Windows\nLocation: San Francisco, CA\nTime: Dec 15, 2024 10:30 AM PST\n\nIf this was you, you can disregard this email. If not, please secure your account immediately.\n\nGitHub Security',
    isPhishing: false,
    clues: ['Legitimate alert format', 'Specific details', 'Doesn\'t ask for action'],
  },
  {
    id: 5,
    from: 'prize@lottery-winner.net',
    subject: 'Congratulations! You Won $1,000,000',
    preview: 'Claim your prize now!',
    body: 'CONGRATULATIONS!!!\n\nYou have been selected as the winner of our international lottery! You won $1,000,000 USD!\n\nTo claim your prize, send us your:\n- Full name\n- Bank account details\n- Social security number\n- Processing fee of $500\n\nACT NOW before it expires!\n\nDr. John Smith\nLottery Commission',
    isPhishing: true,
    clues: ['Too good to be true', 'Asks for sensitive info', 'Requires payment', 'Poor grammar'],
  },
];

export const smsMessages = [
  {
    id: 1,
    sender: 'BANK-ALERT',
    message: 'Your account has been locked due to suspicious activity. Click here to unlock: http://bank-secure-login.xyz',
    isScam: true,
    explanation: 'Banks never send links via SMS. The URL is suspicious (.xyz domain). Always contact your bank directly.',
  },
  {
    id: 2,
    sender: '+1-555-0123',
    message: 'Hi! This is Sarah from dentist office. Your appointment is confirmed for tomorrow at 2 PM. Reply YES to confirm.',
    isScam: false,
    explanation: 'This is a legitimate appointment reminder. Legitimate businesses often send confirmation texts.',
  },
  {
    id: 3,
    sender: 'Amazon',
    message: 'Dear customer, we could not deliver your package. Pay shipping fee here: amaz0n-delivery.com',
    isScam: true,
    explanation: 'Fake delivery scam with misspelled domain (amaz0n). Amazon doesn\'t ask for fees via SMS links.',
  },
  {
    id: 4,
    sender: '+1-555-7890',
    message: 'Congratulations! You won a FREE iPhone 15! Claim it now at: win-iphone-free.biz - Limited time!',
    isScam: true,
    explanation: 'Classic "too good to be true" scam. Free expensive items are always scams.',
  },
];

export const securityQuestions = [
  {
    id: 1,
    question: 'What is phishing?',
    options: [
      'A type of fishing sport',
      'A cyber attack using fake emails to steal data',
      'A programming language',
      'A firewall technique'
    ],
    correct: 1,
    explanation: 'Phishing is a cyber attack where attackers send fraudulent emails pretending to be from legitimate sources to steal sensitive information.',
  },
  {
    id: 2,
    question: 'What makes a password strong?',
    options: [
      'Using your birthday',
      'At least 8 characters with uppercase, lowercase, numbers, and symbols',
      'Using the word "password"',
      'Your pet\'s name'
    ],
    correct: 1,
    explanation: 'A strong password should be at least 8 characters long and include a mix of uppercase letters, lowercase letters, numbers, and special symbols.',
  },
  {
    id: 3,
    question: 'What is two-factor authentication (2FA)?',
    options: [
      'Using two different passwords',
      'An extra security layer requiring a second verification method',
      'Two people sharing one account',
      'Logging in twice'
    ],
    correct: 1,
    explanation: '2FA adds an extra layer of security by requiring a second form of verification (like a code sent to your phone) in addition to your password.',
  },
  {
    id: 4,
    question: 'What should you do if you receive a suspicious email?',
    options: [
      'Click all links to investigate',
      'Reply with your password to verify',
      'Delete it and report as spam',
      'Forward it to all contacts'
    ],
    correct: 2,
    explanation: 'Never click links in suspicious emails. Delete them and report as spam. Verify directly with the company if needed.',
  },
  {
    id: 5,
    question: 'What is malware?',
    options: [
      'A type of email',
      'Malicious software designed to harm your device',
      'A web browser',
      'A security certificate'
    ],
    correct: 1,
    explanation: 'Malware is malicious software designed to damage, disrupt, or gain unauthorized access to computer systems.',
  },
  {
    id: 6,
    question: 'Why should you update software regularly?',
    options: [
      'To make it look newer',
      'To fix security vulnerabilities and bugs',
      'To use more storage',
      'Updates are not necessary'
    ],
    correct: 1,
    explanation: 'Software updates often include critical security patches that fix vulnerabilities hackers could exploit.',
  },
  {
    id: 7,
    question: 'What is a VPN?',
    options: [
      'Very Private Network',
      'Virtual Private Network - encrypts your internet connection',
      'Virus Protection Network',
      'Video Playing Network'
    ],
    correct: 1,
    explanation: 'A VPN (Virtual Private Network) encrypts your internet connection and hides your IP address, protecting your privacy online.',
  },
  {
    id: 8,
    question: 'What is the safest way to shop online?',
    options: [
      'Use public WiFi at coffee shops',
      'Share credit card on any website',
      'Use secure websites (HTTPS) and trusted payment methods',
      'Save passwords in browser on public computers'
    ],
    correct: 2,
    explanation: 'Always use secure websites (look for HTTPS and lock icon) and trusted payment methods. Avoid public WiFi for sensitive transactions.',
  },
];

export const securityVulnerabilities = [
  {
    id: 'laptop',
    name: 'Unlocked Laptop',
    description: 'Computer left unlocked and unattended',
    tip: 'Always lock your computer when stepping away (Windows: Win+L, Mac: Cmd+Ctrl+Q)',
  },
  {
    id: 'sticky-note',
    name: 'Password on Sticky Note',
    description: 'Password written on a sticky note attached to monitor',
    tip: 'Never write passwords down. Use a password manager instead.',
  },
  {
    id: 'wifi',
    name: 'Unsecured WiFi',
    description: 'WiFi network without password protection',
    tip: 'Always use WPA2/WPA3 encryption for WiFi networks.',
  },
  {
    id: 'usb',
    name: 'Unknown USB Drive',
    description: 'Suspicious USB drive plugged into computer',
    tip: 'Never plug in unknown USB drives. They could contain malware.',
  },
  {
    id: 'no-antivirus',
    name: 'No Antivirus',
    description: 'Computer running without antivirus protection',
    tip: 'Always run updated antivirus software to protect against malware.',
  },
];
