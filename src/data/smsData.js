export const SMS_MESSAGES_KEY = 'cyberescape_sms_messages';

export const smsMessagesDataset = [
  {
    id: 1,
    sender: "BankAlert",
    message: "Your account will be blocked. Verify immediately: http://bank-secure.xyz",
    type: "scam",
    explanation: "Banks do not ask you to verify your account through unknown links. The .xyz domain is not affiliated with any legitimate bank."
  },
  {
    id: 2,
    sender: "+1-555-0123",
    message: "Hi! This is Dr. Johnson's office. Your appointment is confirmed for Tuesday at 2 PM. Reply CONFIRM or CANCEL.",
    type: "safe",
    explanation: "This is a standard appointment confirmation from a healthcare provider. It asks for a simple reply and doesn't request personal data or include suspicious links."
  },
  {
    id: 3,
    sender: "Amazon",
    message: "Your package could not be delivered. Pay $2.99 redelivery fee: amaz0n-redelivery.com",
    type: "scam",
    explanation: "Amazon doesn't charge redelivery fees via SMS. The misspelled domain 'amaz0n' (with a zero) is a fake site designed to steal your payment information."
  },
  {
    id: 4,
    sender: "+44-7700-900123",
    message: "Congratulations! You won a FREE iPhone 16! Claim now at win-iphone-free.biz - Offer expires today!",
    type: "scam",
    explanation: "You can't win a phone contest you never entered. 'Free' prize sites steal personal data or install malware. The .biz domain and today's deadline are pressure tactics."
  },
  {
    id: 5,
    sender: "USPS",
    message: "USPS: Your package 9400111899223497861293 is out for delivery today. Track at usps.com/tracking",
    type: "safe",
    explanation: "This matches standard USPS delivery notification format with a real tracking number format and the official usps.com domain."
  },
  {
    id: 6,
    sender: "PayPal",
    message: "PayPal: We limited your account. Verify within 24 hrs to avoid suspension: paypa1-verify.net/login",
    type: "scam",
    explanation: "The link uses 'paypa1' (with a number 1) instead of 'paypal'. PayPal manages account issues through their official app or paypal.com, never via suspicious links."
  },
  {
    id: 7,
    sender: "CVS Pharmacy",
    message: "Your prescription is ready for pickup at CVS #4892. Store hours: 8AM-10PM. Questions? Call 555-0147.",
    type: "safe",
    explanation: "Standard pharmacy pickup notification with a store number, hours, and a phone number. No suspicious links or requests for personal information."
  },
  {
    id: 8,
    sender: "+1-800-555-0199",
    message: "IRS NOTICE: You owe back taxes. Pay immediately to avoid arrest: irs-payment-now.net",
    type: "scam",
    explanation: "The IRS never contacts taxpayers via text message. The IRS sends notices by postal mail and never threatens immediate arrest for unpaid taxes via SMS."
  },
  {
    id: 9,
    sender: "Chase",
    message: "Chase Alert: $847.50 purchase at BestBuy.com on your card ending 4892. Not you? Call 1-800-432-3117.",
    type: "safe",
    explanation: "Standard bank transaction alert with masked card digits, merchant name, amount, and official phone number. It asks you to call, not click a link."
  },
  {
    id: 10,
    sender: "FedEx",
    message: "FedEx: Delivery for your address requires customs duty. Pay £1.45 to release: fedex-customs-fee.com/pay",
    type: "scam",
    explanation: "FedEx customs fees are handled directly, not via text links to unofficial domains. This is a 'smishing' (SMS phishing) attack common in the UK targeting delivery recipients."
  },
  {
    id: 11,
    sender: "Uber",
    message: "Your Uber trip receipt: $18.50, Jan 15 2025, Miami to Miami Int'l Airport. Questions? uber.com/help",
    type: "safe",
    explanation: "Standard Uber trip receipt with specific amount, date, and route. It links to the official uber.com help page, not a suspicious external domain."
  },
  {
    id: 12,
    sender: "+1-202-555-0175",
    message: "MEDICARE: Your benefits are expiring. Update your Medicare card at medicare-renewal.info/update or lose coverage.",
    type: "scam",
    explanation: "Medicare contacts beneficiaries via official mail, not SMS. The .info link is not affiliated with Medicare. This scam targets seniors to steal Social Security numbers."
  },
  {
    id: 13,
    sender: "Google",
    message: "Your Google verification code is 482930. Don't share this code with anyone.",
    type: "safe",
    explanation: "Standard Google 2FA code delivery. The warning 'Don't share this code' is a legitimate security notice that Google includes in all verification texts."
  },
  {
    id: 14,
    sender: "LOTTERY",
    message: "UK National Lottery: You WON £25,000! To claim reply with NAME, DOB, and bank account. Ref: UK-82742",
    type: "scam",
    explanation: "The UK National Lottery doesn't notify winners via text and never asks for bank details via SMS. You can't win a lottery you didn't enter."
  },
  {
    id: 15,
    sender: "DoorDash",
    message: "DoorDash: Your order from Chipotle is on the way! Estimated arrival: 25-35 mins. Track at doordash.com",
    type: "safe",
    explanation: "Standard DoorDash order update with a real restaurant name, estimated time, and link to the official doordash.com site."
  },
  {
    id: 16,
    sender: "Apple",
    message: "URGENT: Your Apple ID is compromised. Restore access: apple-id-secure.net/login — Expires in 1 hour.",
    type: "scam",
    explanation: "Apple manages account security through appleid.apple.com, never through third-party .net domains. The 1-hour expiry is a pressure tactic to stop you from thinking clearly."
  },
  {
    id: 17,
    sender: "School District",
    message: "Jefferson Elementary: School is canceled tomorrow due to severe weather forecast. Stay safe!",
    type: "safe",
    explanation: "Standard school closure notification. No links, no data requests, and the message provides a clear, specific reason with a safety message."
  },
  {
    id: 18,
    sender: "Wells Fargo",
    message: "WF Fraud Alert: Did you just attempt $1,200.00 at CoinBase? Reply YES or NO. Do not call back.",
    type: "scam",
    explanation: "The instruction 'Do not call back' is a red flag — legitimate banks want you to verify by calling their official number. Real fraud alerts don't discourage verification."
  },
  {
    id: 19,
    sender: "Airbnb",
    message: "Airbnb: Your reservation in Paris is confirmed! Check-in: March 10. View details: airbnb.com/trips",
    type: "safe",
    explanation: "Standard Airbnb booking confirmation with specific destination, date, and a link to the official airbnb.com platform."
  },
  {
    id: 20,
    sender: "PRIZE-DEPT",
    message: "You've been selected to receive a $500 Walmart gift card! Claim at walmart-gift-reward.biz before midnight.",
    type: "scam",
    explanation: "Walmart gift card scams are extremely common. The .biz domain, midnight deadline, and 'selected' language without any prior entry are classic scam hallmarks."
  },
  {
    id: 21,
    sender: "Netflix",
    message: "Netflix: We're having trouble with your current billing info. Update at netflix.com/account/billing.",
    type: "safe",
    explanation: "Standard Netflix billing issue notice linking to the official netflix.com domain. Note it links to netflix.com directly, not a third-party site."
  },
  {
    id: 22,
    sender: "Citibank",
    message: "CITI ALERT: Your account access has been suspended. Visit citi-bank-secure.com/verify to restore access.",
    type: "scam",
    explanation: "Citibank's official domain is citi.com or citibank.com. The domain 'citi-bank-secure.com' is a fake site. Real bank alerts link to their official domain."
  },
  {
    id: 23,
    sender: "+1-555-4729",
    message: "Hi, I found your number on a job board. I'm hiring remote data entry workers. Earn $500/day from home. Interested?",
    type: "scam",
    explanation: "Unsolicited job offers via SMS for unrealistically high pay are almost always scams. These advance-fee or money mule scams often lead to identity theft or financial loss."
  },
  {
    id: 24,
    sender: "Amazon",
    message: "Your Amazon order #112-4859234 has been delivered. Leave a review: amazon.com/reviews",
    type: "safe",
    explanation: "Standard Amazon post-delivery review request with a real order number format and the official amazon.com domain link."
  },
  {
    id: 25,
    sender: "SECURITY",
    message: "Your SSN has been suspended due to suspicious activity. Call 1-888-555-0132 immediately to avoid legal action.",
    type: "scam",
    explanation: "Social Security numbers cannot be 'suspended'. This is a Social Security Administration (SSA) impersonation scam. The SSA contacts people via mail, not phone or text."
  },
  {
    id: 26,
    sender: "Venmo",
    message: "Venmo: Sarah sent you $45.00 'For last night's dinner'. Accept at venmo.com.",
    type: "safe",
    explanation: "Standard Venmo payment notification with sender name, amount, and a payment note. Links to the official venmo.com site, not a third-party domain."
  },
  {
    id: 27,
    sender: "+1-866-555-0188",
    message: "Your computer has a virus! Call Microsoft Support: 1-888-555-0155 immediately to prevent data loss.",
    type: "scam",
    explanation: "Microsoft never sends unsolicited texts about viruses on your computer. This is a tech support scam designed to charge you for fake 'repairs' or gain remote access."
  },
  {
    id: 28,
    sender: "USAA",
    message: "USAA: We detected a suspicious sign-in attempt. If this wasn't you, visit usaa.com/security to secure your account.",
    type: "safe",
    explanation: "Standard bank security alert linking to the official usaa.com domain. It doesn't request credentials or click-through on suspicious links."
  },
  {
    id: 29,
    sender: "Survey",
    message: "Complete our 2-minute survey and win a $250 gas card! Take it now: survey-rewards-center.net/gas",
    type: "scam",
    explanation: "Unsolicited survey-reward SMS messages are data harvesting scams. The .net 'survey' domain collects personal data or payment info. No legitimate gas card reward comes unsolicited."
  },
  {
    id: 30,
    sender: "Starbucks",
    message: "Your Starbucks order is ready at Store #7842! We made your Grande Caramel Macchiato.",
    type: "safe",
    explanation: "Standard mobile order ready notification with specific store number and order details. No links, no personal data requests."
  },
  {
    id: 31,
    sender: "UNEMPLOYMENT",
    message: "Unemployment Benefits: Your claim of $4,892 is pending. Update your direct deposit: edd-benefit-update.com",
    type: "scam",
    explanation: "State unemployment agencies manage claims through official state government (.gov) websites, never via third-party .com links in SMS. This scam targets people looking for financial help."
  },
  {
    id: 32,
    sender: "Capital One",
    message: "Capital One: A new device was used to sign in. Was this you? Reply YES or call 1-800-227-4825.",
    type: "safe",
    explanation: "Standard bank security alert that asks you to reply YES or call their official phone number. It doesn't include any suspicious links."
  },
  {
    id: 33,
    sender: "CRYPTO",
    message: "Elon Musk Bitcoin Giveaway! Send 0.1 BTC, get 0.2 BTC back! Limited time: bitcoin-double.io",
    type: "scam",
    explanation: "Celebrity cryptocurrency doubling scams are among the most widespread crypto frauds. No one doubles your Bitcoin. Funds sent to these sites are gone forever."
  },
  {
    id: 34,
    sender: "Lyft",
    message: "Thanks for riding with Lyft! Your receipt for $12.75, Jan 15 2025. View at lyft.com/account/trips.",
    type: "safe",
    explanation: "Standard Lyft receipt notification with amount and date, linking to the official lyft.com account page."
  },
  {
    id: 35,
    sender: "ALERT",
    message: "URGENT: There is a warrant for your arrest. Pay $500 in iTunes gift cards to avoid jail. Call 1-866-555-0142.",
    type: "scam",
    explanation: "No government agency accepts payment in gift cards. Arrest warrants are not announced via text. This is a government impersonation scam targeting fear and urgency."
  },
  {
    id: 36,
    sender: "Spotify",
    message: "Spotify Premium: Your payment was declined. Update your billing method at spotify.com/account to continue.",
    type: "safe",
    explanation: "Standard Spotify payment failure notice pointing to the official spotify.com domain. No credentials requested, and it does not link to a third-party site."
  },
  {
    id: 37,
    sender: "+1-833-555-0167",
    message: "GRANDMA, it's me! I'm in trouble and need $2,000 in gift cards urgently. Please don't tell mom/dad.",
    type: "scam",
    explanation: "This is the classic 'grandparent scam'. Scammers impersonate grandchildren to create urgency and secrecy. Always call the family member directly on their known number to verify."
  },
  {
    id: 38,
    sender: "TD Bank",
    message: "TD Bank: Your monthly statement for account ending 3847 is available. View at tdbank.com/online.",
    type: "safe",
    explanation: "Standard bank statement notification with masked account number linking to the official tdbank.com. No credentials or personal data requested."
  },
  {
    id: 39,
    sender: "REWARD",
    message: "T-Mobile Customer: You've earned 10,000 FREE reward points! Claim at t-mobile-rewards.net/claim now!",
    type: "scam",
    explanation: "T-Mobile's official rewards program is at t-mobile.com/rewards. The unofficial 't-mobile-rewards.net' domain is a phishing site. Legitimate carrier rewards are in their official app."
  },
  {
    id: 40,
    sender: "LinkedIn",
    message: "You have 3 new connection requests and 5 profile views this week. Check them at linkedin.com/notifications.",
    type: "safe",
    explanation: "Standard LinkedIn weekly notification linking to the official linkedin.com domain. No personal data requested and no suspicious external links."
  },
  {
    id: 41,
    sender: "PACKAGE",
    message: "UPS: We tried to deliver a parcel but you were out. Pay £1.99 to rearrange: ups-redelivery.co.uk/pay",
    type: "scam",
    explanation: "UPS doesn't charge redelivery fees via text links. The unofficial domain 'ups-redelivery.co.uk' is not affiliated with UPS. This small-amount scam is designed to capture card details."
  },
  {
    id: 42,
    sender: "Walmart",
    message: "Your Walmart order #7294-8839 has shipped via FedEx. Track at walmart.com/account/orders.",
    type: "safe",
    explanation: "Standard Walmart order shipping notification with real order number format and link to official walmart.com. Mentions FedEx as the carrier for credibility."
  },
  {
    id: 43,
    sender: "DATING",
    message: "Someone special is waiting to meet you! Complete your profile at secretmatch-dating.com. Free for 24 hours!",
    type: "scam",
    explanation: "Unsolicited dating site text messages are phishing attempts or subscription traps. 'Free for 24 hours' means they capture your payment details then charge you."
  },
  {
    id: 44,
    sender: "Bank of America",
    message: "BofA Fraud Prevention: Did you authorize $345 at Macy's? Reply 1 for YES or 2 for NO.",
    type: "safe",
    explanation: "Standard bank fraud verification asking for a simple number reply. No links, no data requests beyond a yes/no confirmation."
  },
  {
    id: 45,
    sender: "CASH",
    message: "Cash App: Your $875 payment is pending. Verify your identity at cashapp-verify.net to receive funds.",
    type: "scam",
    explanation: "Cash App's official domain is cash.app. The unofficial 'cashapp-verify.net' is a phishing site. Pending payments on Cash App don't require third-party identity verification."
  },
  {
    id: 46,
    sender: "Planet Fitness",
    message: "Planet Fitness Reminder: Your membership fee of $24.99 will be charged tomorrow. Manage at planetfitness.com.",
    type: "safe",
    explanation: "Standard gym membership billing reminder with the exact charge amount and a link to the official planetfitness.com website."
  },
  {
    id: 47,
    sender: "TAX-REFUND",
    message: "HMRC: You are entitled to a tax refund of £349.18. Claim it at hmrc-refund-portal.com/claim",
    type: "scam",
    explanation: "HMRC (UK tax authority) communicates via official mail or its website at hmrc.gov.uk. The unofficial .com domain is a fake. HMRC phishing is extremely common in the UK."
  },
  {
    id: 48,
    sender: "+1-555-3892",
    message: "Hi! This is Mike from State Farm. Just confirming your appointment for a quote review tomorrow at 10 AM at our Main St office.",
    type: "safe",
    explanation: "Legitimate appointment reminder from an insurance agent with specific location and time. No links or requests for sensitive information."
  },
  {
    id: 49,
    sender: "CRYPTO-WIN",
    message: "You've won 0.5 ETH in our airdrop! Claim by connecting your wallet at ethereum-airdrop-claim.io",
    type: "scam",
    explanation: "Ethereum airdrops are never distributed via SMS. Connecting your wallet to this site would drain all your cryptocurrency funds — a common DeFi scam."
  },
  {
    id: 50,
    sender: "Target",
    message: "Target Circle: You have $7.35 in Target Circle earnings ready to use. Shop at target.com or in-store.",
    type: "safe",
    explanation: "Standard Target loyalty program earnings notification. The specific low amount ($7.35) is realistic for a rewards notification. Links to the official target.com."
  },
  {
    id: 51,
    sender: "MEDICARE",
    message: "New Medicare benefit available! Get free dental & vision. Enroll today: medicare-extra-benefits.net",
    type: "scam",
    explanation: "Medicare benefit enrollment is managed at medicare.gov. Unsolicited texts about 'new benefits' are identity theft scams targeting seniors to collect Medicare ID numbers."
  },
  {
    id: 52,
    sender: "Google Pay",
    message: "You received $50.00 from James (james@email.com). View in Google Pay app or g.co/pay.",
    type: "safe",
    explanation: "Standard Google Pay payment notification with sender details. The link uses a legitimate Google short URL (g.co) which redirects to the official Google Pay platform."
  },
  {
    id: 53,
    sender: "WINNINGS",
    message: "Publishers Clearing House: You've won $10 million! Claim prize code PCH-2025-WINNER at pchlotto-claims.net",
    type: "scam",
    explanation: "PCH never notifies winners via random text messages to people who didn't enter. The unofficial .net domain confirms this is not PCH. Real PCH contact is through their official site."
  },
  {
    id: 54,
    sender: "CVS",
    message: "CVS/pharmacy: You have an ExtraCare reward of $5.00 ready to use. Visit cvs.com/extracare for details.",
    type: "safe",
    explanation: "Standard CVS ExtraCare loyalty notification with a specific reward amount and link to the official cvs.com website."
  },
  {
    id: 55,
    sender: "VISA-ALERT",
    message: "VISA: Transaction declined at Amazon for $129.99. Update your card details at visa-card-update.com",
    type: "scam",
    explanation: "Visa and card networks contact you through your bank, not via text links. Visa's domain is visa.com, not 'visa-card-update.com'. This is a card detail phishing attack."
  },
  {
    id: 56,
    sender: "Costco",
    message: "Your Costco membership renews in 30 days. Manage your membership at costco.com/member-services.",
    type: "safe",
    explanation: "Standard Costco membership renewal reminder with adequate notice (30 days, not 'tomorrow') and a link to the official costco.com member services page."
  },
  {
    id: 57,
    sender: "SOCIAL-SEC",
    message: "Social Security Administration: Your benefits have been suspended. Verify at ssa-gov-benefits.com immediately.",
    type: "scam",
    explanation: "SSA's official domain is ssa.gov. 'ssa-gov-benefits.com' is a fake site. SSA contacts people via postal mail and their official site. Benefits can't be suspended via text."
  },
  {
    id: 58,
    sender: "Bank",
    message: "Your bank transfer of $3,500 to Account #847293 has been scheduled. Not you? Call 1-800-555-0134.",
    type: "scam",
    explanation: "The vague 'Bank' sender and a specific large transfer you didn't initiate creates panic. The goal is for you to call the fake number and provide account details. Real banks identify themselves fully."
  },
  {
    id: 59,
    sender: "Eventbrite",
    message: "Reminder: 'JavaScript Developer Conference 2025' is tomorrow at 9 AM at Moscone Center, SF. Add to calendar: evbrite.co/e/349821",
    type: "safe",
    explanation: "Standard Eventbrite event reminder with specific event name, time, and venue. 'evbrite.co' is Eventbrite's official short URL domain."
  },
  {
    id: 60,
    sender: "CHARITY",
    message: "Red Cross URGENT: Disaster victims need YOUR help TODAY. Donate now: redcross-emergency-donate.net",
    type: "scam",
    explanation: "The Red Cross's official donation site is redcross.org. Unsolicited donation SMS texts pointing to unofficial domains are charity fraud. Always donate through official charity websites."
  },
  {
    id: 61,
    sender: "REFUND",
    message: "You are owed a refund of $89.50 from your last order. Claim it at shoprefund-center.com/claim",
    type: "scam",
    explanation: "No legitimate retailer sends refund notices via SMS with a third-party .com link. Real refunds are processed automatically to your original payment method."
  },
  {
    id: 62,
    sender: "Southwest",
    message: "Southwest Airlines: Your flight WN2847 to LAX departs tomorrow at 7:30 AM from Gate C12. Check in: southwest.com",
    type: "safe",
    explanation: "Standard flight reminder with flight number, destination, time, and gate. Links to the official southwest.com website for check-in."
  },
  {
    id: 63,
    sender: "+1-888-555-0198",
    message: "FINAL NOTICE: Your vehicle's extended warranty is expiring. Call 1-888-555-0198 immediately to maintain coverage.",
    type: "scam",
    explanation: "The infamous extended vehicle warranty scam. If you didn't purchase a warranty, you can't be losing one. These calls/texts collect financial information."
  },
  {
    id: 64,
    sender: "Instacart",
    message: "Your Instacart order from Whole Foods is delivered! Leave your shopper a tip at instacart.com/rates.",
    type: "safe",
    explanation: "Standard Instacart delivery confirmation with store name and a link to the official instacart.com tipping page."
  },
  {
    id: 65,
    sender: "POLICE",
    message: "You have an active warrant for your arrest. Avoid arrest by paying $750 bail via Zelle to policedebt@gmail.com NOW.",
    type: "scam",
    explanation: "Police never contact you via text for warrant payment. They never accept payment via Zelle or to Gmail accounts. This is a government impersonation extortion scam."
  },
  {
    id: 66,
    sender: "Hulu",
    message: "Hulu: Your Premium subscription renews on Jan 20 for $17.99. Manage at hulu.com/account.",
    type: "safe",
    explanation: "Standard Hulu subscription renewal reminder with exact amount and date. Links to the official hulu.com account management page."
  },
  {
    id: 67,
    sender: "LOAN",
    message: "You've been pre-approved for a $5,000 personal loan! No credit check. Apply: instant-loan-approved.com",
    type: "scam",
    explanation: "'No credit check' pre-approved loans via SMS are advance-fee scams. These sites charge upfront 'processing fees' and vanish with your money and personal data."
  },
  {
    id: 68,
    sender: "Apple Pay",
    message: "Apple Pay: $1,200.00 payment pending your approval. Approve or deny in Wallet app > Recent Transactions.",
    type: "safe",
    explanation: "Standard Apple Pay transaction authorization. It directs you to the official Wallet app, not a link. The message doesn't include any external URLs."
  },
  {
    id: 69,
    sender: "DEBT",
    message: "Your debt of $4,200 qualifies for government debt relief. Apply today: gov-debt-relief-program.com",
    type: "scam",
    explanation: "Government debt relief programs exist at official .gov sites. This unofficial .com domain is a debt consolidation scam that charges advance fees and steals personal info."
  },
  {
    id: 70,
    sender: "Marriott",
    message: "Marriott Bonvoy: Your reservation at Marriott Downtown Chicago is confirmed! Check-in Mar 15. View: marriott.com/reservations",
    type: "safe",
    explanation: "Standard hotel booking confirmation with property name, check-in date, and link to the official marriott.com reservations page."
  },
  {
    id: 71,
    sender: "WINNER",
    message: "ATTN: Your phone number has been selected to WIN a FREE vacation to the Bahamas! Claim: tropical-prize-winner.com",
    type: "scam",
    explanation: "Phone numbers don't win vacations. Clicking the link will require credit card details for 'taxes' or 'fees'. These are vacation scams targeting impulse decisions."
  },
  {
    id: 72,
    sender: "Chase Bank",
    message: "Chase: Your credit card payment of $234.50 posted on Jan 15. Available credit: $8,250. View: chase.com/card",
    type: "safe",
    explanation: "Standard bank payment confirmation with specific amount, date, and available credit. Links to the official chase.com with a specific path."
  },
  {
    id: 73,
    sender: "ALERT",
    message: "Suspicious activity detected on your device. Your personal data is at risk! Install protection now: mobile-security-fix.net",
    type: "scam",
    explanation: "Devices cannot detect security issues via SMS from third parties. This fake security alert tries to get you to install malware disguised as 'protection'."
  },
  {
    id: 74,
    sender: "Duolingo",
    message: "Don't break your streak! You haven't practiced German today. Keep going at duolingo.com/learn.",
    type: "safe",
    explanation: "Standard Duolingo streak reminder with specific language mention. Links to the official duolingo.com learning platform."
  },
  {
    id: 75,
    sender: "+1-855-555-0172",
    message: "This is the US Treasury. Your tax return has a discrepancy. Call 1-855-555-0172 to avoid criminal charges.",
    type: "scam",
    explanation: "The US Treasury communicates via official mail and treasury.gov. Threatening 'criminal charges' via SMS is a hallmark of government impersonation scams."
  },
  {
    id: 76,
    sender: "Stripe",
    message: "Stripe: $1,247.50 was deposited to your bank account ending in 4729. View at dashboard.stripe.com.",
    type: "safe",
    explanation: "Standard Stripe payout notification with specific amount, masked bank account, and link to the official Stripe dashboard."
  },
  {
    id: 77,
    sender: "FREE-MONEY",
    message: "Government COVID relief: You qualify for $1,400 unclaimed stimulus! Claim at covid-relief-payment.com",
    type: "scam",
    explanation: "COVID stimulus payments ended years ago and were distributed through the IRS, never via text links to .com sites. This exploits nostalgia for relief payments to collect SSNs and bank info."
  },
  {
    id: 78,
    sender: "GitHub",
    message: "GitHub: A new SSH key was added to your account. If you didn't add this, review at github.com/settings/keys.",
    type: "safe",
    explanation: "Standard GitHub security notification about SSH key changes. It provides a specific link to the official GitHub security settings for verification."
  },
  {
    id: 79,
    sender: "DATING2",
    message: "Jessica (28) near you is interested! She liked your profile. Message her free today: flirt-match-local.com",
    type: "scam",
    explanation: "These unsolicited dating texts lead to subscription trap sites. There's no 'Jessica' — these are bots. Once you sign up, you're charged recurring fees."
  },
  {
    id: 80,
    sender: "Verizon",
    message: "Verizon: Your bill of $87.50 for January is due Feb 10. Pay at verizon.com/myverizon or call *611.",
    type: "safe",
    explanation: "Standard carrier billing notification with exact amount, due date, and official payment options (website and carrier code *611)."
  },
  {
    id: 81,
    sender: "+1-866-555-0191",
    message: "Congratulations! You won a $1000 Home Depot gift card from our customer survey. Click to claim: homedepot-survey-prize.biz",
    type: "scam",
    explanation: "Home Depot gift card scams are common. The .biz domain is not Home Depot. You'll be asked for personal data or payment info to 'process' the gift card that doesn't exist."
  },
  {
    id: 82,
    sender: "Peloton",
    message: "Your Peloton ride summary: 35 min Cycling with Robin Arzón, 285 output, top 12% of riders. Keep it up!",
    type: "safe",
    explanation: "Standard fitness summary notification with specific workout details. No links to external sites or requests for personal information."
  },
  {
    id: 83,
    sender: "BANK-UPGRADE",
    message: "Your bank account is being upgraded. Confirm your details at secure-bank-upgrade-2025.com within 24 hours to avoid account closure.",
    type: "scam",
    explanation: "Banks don't 'upgrade' accounts via text links. The vague 'Your bank' sender and unofficial .com domain are clear phishing indicators. The 24-hour closure threat creates false urgency."
  },
  {
    id: 84,
    sender: "Zoom",
    message: "Your Zoom cloud recording 'Team Standup Jan 15' is ready. Watch at zoom.us/recording/list",
    type: "safe",
    explanation: "Standard Zoom recording notification with specific meeting name and link to the official zoom.us recording portal."
  },
  {
    id: 85,
    sender: "+1-775-555-0129",
    message: "Hi neighbor! This is Emma from NextDoor. Did you see the car break-ins last night on Oak St? Reply to discuss.",
    type: "scam",
    explanation: "NextDoor messages come through the app, not random texts. Strangers texting to build trust are often setting up for social engineering or fraud. Never engage with random 'neighbor' texts."
  },
  {
    id: 86,
    sender: "IRS",
    message: "IRS: Your 2024 tax return has been processed. Your refund of $847 will be deposited within 21 days.",
    type: "safe",
    explanation: "While the IRS doesn't typically send texts, some legitimate refund notifications exist. However, this message provides no link or request — it's informational only. Verify at irs.gov/refunds."
  },
  {
    id: 87,
    sender: "CRYPTO-PROFIT",
    message: "Our AI trading bot made $4,820 for you today! Withdraw your profit at ai-crypto-profit.io/withdraw",
    type: "scam",
    explanation: "No AI trading bot generates thousands in guaranteed profit. These scams trick victims into depositing money to 'access' fake profits, which disappear along with the deposit."
  },
  {
    id: 88,
    sender: "Salesforce",
    message: "Salesforce: Your monthly report 'Q1 Pipeline Overview' is ready. View at salesforce.com/reports.",
    type: "safe",
    explanation: "Standard Salesforce report ready notification linking to the official salesforce.com platform."
  },
  {
    id: 89,
    sender: "SCAMMERS",
    message: "Your subscription to Adult Content Portal was renewed for $49.99. To cancel call: 1-888-555-0133 immediately.",
    type: "scam",
    explanation: "Fake subscription charges are a phone call scam. Calling the number leads to 'agents' who ask for card details to 'process the cancellation'. Ignore and block."
  },
  {
    id: 90,
    sender: "Slack",
    message: "Slack: You have 5 unread messages in #general. Open the Slack app or visit slack.com to read them.",
    type: "safe",
    explanation: "Standard Slack notification with specific channel name and unread count. Links to the official slack.com platform."
  },
  {
    id: 91,
    sender: "BENEFIT",
    message: "Your Medicaid application is approved for $1,200/month in benefits. Set up direct deposit: medicaid-benefits-portal.com",
    type: "scam",
    explanation: "Medicaid enrollment is handled at state government .gov portals. The unofficial .com domain and unsolicited benefit approval are identity theft and bank account fraud tactics."
  },
  {
    id: 92,
    sender: "Delta Airlines",
    message: "Delta: Your flight DL402 from ATL to JFK is on time. Gate D15. Departs 3:45 PM. Check in: delta.com",
    type: "safe",
    explanation: "Standard airline flight status notification with flight number, route, gate, and time. Links to the official delta.com website."
  },
  {
    id: 93,
    sender: "ROMANCE",
    message: "Hi! I think we met at the conference last week? I'm Sarah. This is my new number. How are you doing?",
    type: "scam",
    explanation: "This is a romance or pig-butchering scam opener. The goal is to build a relationship over weeks/months, then request money for a 'crisis' or a 'crypto investment opportunity'."
  },
  {
    id: 94,
    sender: "PayPal",
    message: "PayPal: A payment of $250.00 to johndoe@email.com is complete. Ref: 1HD83629JS3858639. View at paypal.com/activity",
    type: "safe",
    explanation: "Standard PayPal payment confirmation with specific amount, recipient email, and transaction reference number. Links to official paypal.com activity page."
  },
  {
    id: 95,
    sender: "JOB-OFFER",
    message: "We viewed your LinkedIn profile and want to offer you $120,000/year fully remote. Reply with your resume and SSN to apply.",
    type: "scam",
    explanation: "Legitimate employers never ask for your Social Security Number via text. Requesting an SSN in a first contact is identity theft. Job offers come through official application processes."
  },
  {
    id: 96,
    sender: "T-Mobile",
    message: "T-Mobile: Your AutoPay of $65.00 will process in 3 days. Manage at t-mobile.com/account.",
    type: "safe",
    explanation: "Standard carrier AutoPay reminder with exact amount and link to the official t-mobile.com account page."
  },
  {
    id: 97,
    sender: "CLAIM",
    message: "Class Action Settlement: You may be owed $340 from Facebook's data breach. Claim at facebook-settlement-claim.net",
    type: "scam",
    explanation: "Legitimate class action settlements are administered through court-approved websites with .com or official domains, not .net 'claim' sites. Verify any settlement at classaction.org."
  },
  {
    id: 98,
    sender: "Robinhood",
    message: "Robinhood: Your deposit of $500.00 from Chase Bank has been credited to your account. Start investing at robinhood.com.",
    type: "safe",
    explanation: "Standard investment app deposit confirmation from the official Robinhood service. Links to robinhood.com with no credential or sensitive data requests."
  },
  {
    id: 99,
    sender: "PRIZE",
    message: "You have been selected for a $10,000 home renovation grant from the government. Apply: home-renovation-grant.com",
    type: "scam",
    explanation: "Government grants are applied for through official .gov websites. Unsolicited 'you've been selected' grant notices via SMS are advance-fee scams targeting homeowners."
  },
  {
    id: 100,
    sender: "Google",
    message: "Your Google Workspace storage is 85% full (84.5 GB of 100 GB). Manage at admin.google.com/storage.",
    type: "safe",
    explanation: "Standard Google Workspace storage alert with specific percentage and GB amounts, linking to the official admin.google.com portal."
  },
  {
    id: 101,
    sender: "HEALTH",
    message: "Your COVID-19 test results are ready. Log in with your SSN to view: healthrecords-covid.net/results",
    type: "scam",
    explanation: "Medical test results are delivered through official patient portals and require medical record login, not your SSN. This is healthcare data theft targeting COVID-related anxiety."
  },
  {
    id: 102,
    sender: "Microsoft",
    message: "Microsoft 365: Your subscription renews Jan 31 for $99.99. Manage at account.microsoft.com.",
    type: "safe",
    explanation: "Standard Microsoft subscription renewal reminder with exact price, date, and link to the official account.microsoft.com management page."
  },
  {
    id: 103,
    sender: "INVESTMENT",
    message: "Exclusive opportunity: Invest $500 in our cryptocurrency fund and earn 10% returns weekly. Limited spots: vip-crypto-fund.io",
    type: "scam",
    explanation: "10% weekly returns are mathematically impossible for any legitimate investment. This is a Ponzi scheme. The 'limited spots' creates artificial urgency. Never invest via unsolicited texts."
  },
  {
    id: 104,
    sender: "Shopify",
    message: "Shopify: Your store processed $1,247.00 in sales today. View your dashboard at admin.shopify.com.",
    type: "safe",
    explanation: "Standard Shopify daily sales notification with a specific amount and link to the official Shopify admin dashboard."
  },
  {
    id: 105,
    sender: "TOLL",
    message: "SunPass: Unpaid toll balance of $3.45. Pay online to avoid late fees: sunpass-toll-payment.net",
    type: "scam",
    explanation: "Toll agencies have official websites and mobile apps. 'SunPass' in Florida uses sunpass.com. Small toll amounts are designed to seem credible — the goal is capturing your card details."
  },
  {
    id: 106,
    sender: "Coinbase",
    message: "Coinbase: $230.47 of Bitcoin was sold from your account. View transaction at coinbase.com/transactions.",
    type: "safe",
    explanation: "Standard Coinbase transaction notification with specific amount and link to official coinbase.com. No credential requests or suspicious links."
  },
  {
    id: 107,
    sender: "BANK-PIN",
    message: "Your new debit card PIN is 4729. To activate your card, call 1-844-555-0139 and provide your SSN.",
    type: "scam",
    explanation: "Banks never send PINs via text — PINs are set by the customer. Calling the provided number and giving your SSN would compromise your identity and account."
  },
  {
    id: 108,
    sender: "Comcast",
    message: "Xfinity: Your technician appointment for tomorrow between 2-4 PM is confirmed. Reschedule at xfinity.com/appointments.",
    type: "safe",
    explanation: "Standard cable/internet service appointment confirmation with specific time window and link to the official xfinity.com portal."
  },
  {
    id: 109,
    sender: "SCAM-JOB",
    message: "Part-time job: Receive packages at your home, repack, and reship for $50/package. Apply: package-reshipping-jobs.com",
    type: "scam",
    explanation: "Package reshipping jobs are money mule scams. You'd be reshipping stolen goods, making yourself criminally liable. 'Work from home reshipping' is always illegal activity."
  },
  {
    id: 110,
    sender: "American Airlines",
    message: "AA Flight AA1283 to DFW departs at 6:15 AM. Check-in required by 5:45 AM. Gate B22. Manage trip: aa.com",
    type: "safe",
    explanation: "Standard airline day-of-departure notification with flight details, gate, and check-in time. Links to the official aa.com website."
  },
  {
    id: 111,
    sender: "URGENT-VERIFY",
    message: "Your identity has been used in fraud. Protect yourself now: call 1-877-555-0114 or visit identity-fraud-protection.net",
    type: "scam",
    explanation: "Identity protection services don't notify you by random text. This is a fear-based scam. Calling the number or visiting the site leads to fake subscriptions or credential theft."
  },
  {
    id: 112,
    sender: "Twitch",
    message: "Someone is now live on Twitch: GamersUnite is playing Minecraft. Watch now at twitch.tv/gamerunite.",
    type: "safe",
    explanation: "Standard Twitch live stream notification for a followed channel. Links to the official twitch.tv domain."
  },
  {
    id: 113,
    sender: "LOAN-OFFER",
    message: "Debt consolidation approved! Get $15,000 at 0% APR. No credit check. Accept at debt-relief-now.com/claim",
    type: "scam",
    explanation: "0% APR for $15,000 with no credit check is impossible from any legitimate lender. This is an advance-fee loan scam that collects upfront 'insurance fees' before vanishing."
  },
  {
    id: 114,
    sender: "Notion",
    message: "Notion: Alex has shared 'Team Wiki' with you. View at notion.so/team-wiki.",
    type: "safe",
    explanation: "Standard Notion sharing notification with sharer's name and the specific page title. Links to the official notion.so platform."
  },
  {
    id: 115,
    sender: "FREE-SERVICE",
    message: "Congratulations! You've won a FREE 2-year Norton 360 license. Claim before it expires: norton-free-award.com",
    type: "scam",
    explanation: "Norton doesn't award free software licenses via SMS. The unofficial domain is not Norton. This site either delivers malware disguised as antivirus or steals credit card details."
  },
  {
    id: 116,
    sender: "Ring",
    message: "Ring Doorbell: Motion detected at your front door on Jan 15 at 2:47 PM. View clip at ring.com/account.",
    type: "safe",
    explanation: "Standard Ring doorbell motion alert with specific time and link to the official ring.com account portal."
  },
  {
    id: 117,
    sender: "SWEEPSTAKES",
    message: "Pepsi Sweepstakes Winner! You won a $5,000 Visa gift card! Verify at pepsi-winners-circle.com and enter code: WIN5000",
    type: "scam",
    explanation: "Pepsi would notify real winners through official channels, not random texts. Gift card 'winnings' from unknown texts are always scams designed to collect personal info."
  },
  {
    id: 118,
    sender: "Disney+",
    message: "Disney+: Your payment of $13.99 for January was successfully processed. Manage at disneyplus.com/account.",
    type: "safe",
    explanation: "Standard Disney+ billing confirmation with exact amount and link to the official disneyplus.com account management page."
  },
  {
    id: 119,
    sender: "BITCOIN-ATM",
    message: "DO NOT RESPOND TO POLICE. Your account was flagged. Protect your money: deposit cash into Bitcoin ATM and send to this wallet: 1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf...",
    type: "scam",
    explanation: "No government agency or bank asks you to deposit cash into Bitcoin ATMs. This combines a law enforcement impersonation with cryptocurrency fraud — one of the most sophisticated scam types."
  },
  {
    id: 120,
    sender: "Calendly",
    message: "New meeting scheduled! Sarah confirmed 'Project Kickoff' for Jan 20, 2025 at 10:00 AM EST. View at calendly.com/events.",
    type: "safe",
    explanation: "Standard Calendly meeting confirmation with participant name, meeting title, date, and time. Links to the official calendly.com events page."
  },
  {
    id: 121,
    sender: "PAYOFF",
    message: "Your student loan is forgiven! Apply for $0 balance at student-loan-forgiveness-2025.com before the deadline.",
    type: "scam",
    explanation: "Student loan forgiveness programs are administered through studentaid.gov (U.S. Dept. of Education). Unofficial .com sites charge advance fees and collect SSNs without providing forgiveness."
  },
  {
    id: 122,
    sender: "Spotify",
    message: "Wrapped is here! You listened to 47,392 minutes of music in 2024. Your #1 artist was Taylor Swift. View at spotify.com/wrapped.",
    type: "safe",
    explanation: "Standard Spotify Wrapped annual summary with plausible statistics. Links to the official spotify.com/wrapped page — one of Spotify's most popular real features."
  },
  {
    id: 123,
    sender: "BANK-WIRE",
    message: "URGENT: International wire transfer of $12,500 from your account initiated. To stop: call 1-866-555-0159 NOW.",
    type: "scam",
    explanation: "Fake 'wire transfer alert' scams create extreme panic to prompt immediate phone calls. Calling the provided number leads to 'agents' who extract account credentials to 'cancel' the fake transfer."
  },
  {
    id: 124,
    sender: "Figma",
    message: "Lena commented on your design: 'Can we adjust the button color to match the brand guide?' View at figma.com/file/abc123.",
    type: "safe",
    explanation: "Standard Figma comment notification with commenter name, comment preview, and link to the official Figma file using their real URL structure."
  },
  {
    id: 125,
    sender: "INSURANCE",
    message: "Health Insurance enrollment open! Get coverage for $0/month. Enroll now: affordable-health-coverage.com",
    type: "scam",
    explanation: "Health insurance at $0/month with no details is a lead generation scam. These sites collect your SSN and personal health data, then sell it or use it for identity theft."
  },
  {
    id: 126,
    sender: "Robinhood",
    message: "AMZN earnings alert: Amazon beat estimates by 8%. Your portfolio is up 3.2%. View at robinhood.com/portfolio.",
    type: "safe",
    explanation: "Standard Robinhood portfolio update notification triggered by a stock event. Links to the official robinhood.com portfolio page."
  },
  {
    id: 127,
    sender: "PRIZE-CLAIM",
    message: "Your name was drawn in our raffle! You've won a Disney cruise for 4. Claim at disney-raffle-prize.net",
    type: "scam",
    explanation: "Disney cruise prizes are not distributed via SMS raffles. The unofficial .net domain is not affiliated with Disney. This is a vacation scam or data harvesting site."
  },
  {
    id: 128,
    sender: "DocuSign",
    message: "DocuSign: A document 'NDA Agreement' from contracts@company.com is ready for your signature at docusign.com/sign.",
    type: "safe",
    explanation: "Standard DocuSign signature request from docusign.com with document name and sender. Links to the official docusign.com signing portal."
  },
  {
    id: 129,
    sender: "SCAM-ALERT",
    message: "Your Amazon account was compromised. Call Amazon Fraud: 1-877-555-0133 to reverse unauthorized charges of $849.",
    type: "scam",
    explanation: "Amazon communicates through the app and amazon.com, not random texts. Calling the provided number leads to scammers who will ask for Amazon login details or gift cards."
  },
  {
    id: 130,
    sender: "Dropbox",
    message: "Alex shared 'Q4 Financial Reports' folder with you (25 files). View at dropbox.com/sh/abc123.",
    type: "safe",
    explanation: "Standard Dropbox sharing notification with sharer name, folder name, file count, and Dropbox's real share URL format (dropbox.com/sh/)."
  },
  {
    id: 131,
    sender: "ENERGY",
    message: "Your energy bill is critically overdue. Pay $847.39 immediately at utility-payment-portal.com or service will be disconnected tomorrow.",
    type: "scam",
    explanation: "Utility companies send disconnection notices via official mail and their own apps/websites. 'Tomorrow' disconnection via a third-party .com is designed to provoke panic payment."
  },
  {
    id: 132,
    sender: "USPS",
    message: "Your USPS package 9400111899223503849261 is scheduled for delivery today between 2-5 PM.",
    type: "safe",
    explanation: "Standard USPS delivery window notification with a real USPS tracking number format and specific delivery window."
  },
  {
    id: 133,
    sender: "CRYPTO2",
    message: "Passive income: Our automated trading bot earned 23% this month for members. Join VIP: crypto-vip-trading.io/join",
    type: "scam",
    explanation: "23% monthly returns (276% annually) are impossible for any legitimate investment. This is a Ponzi scheme. Early members are paid with new members' deposits until it collapses."
  },
  {
    id: 134,
    sender: "Apple",
    message: "Your Apple ID was used to download Facetime on a new iPhone 15 Pro Max. Not you? Review at appleid.apple.com.",
    type: "safe",
    explanation: "Standard Apple ID sign-in activity notification with specific device name and app. Links to the official appleid.apple.com for account review."
  },
  {
    id: 135,
    sender: "DEBT-COLLECT",
    message: "This is National Collections Agency. You owe $2,847 on an old debt. Settle for 50% TODAY: debt-settle-now.com",
    type: "scam",
    explanation: "Legitimate debt collectors send written notices via postal mail per the Fair Debt Collection Practices Act. Collection via SMS links is fraudulent. Verify any debt through official channels."
  },
  {
    id: 136,
    sender: "Zoom",
    message: "Your Zoom Pro subscription of $14.99/month renews Jan 20. Manage at zoom.us/billing.",
    type: "safe",
    explanation: "Standard Zoom billing reminder with exact amount and renewal date. Links to the official zoom.us billing management page."
  },
  {
    id: 137,
    sender: "COVID-TEST",
    message: "Health Dept: Your COVID test result is POSITIVE. Isolation instructions and compensation form: covid-isolation-pay.gov.contact.com",
    type: "scam",
    explanation: "The domain 'gov.contact.com' is a .com domain, not a government .gov site. Health departments use official state .gov domains. The compensation form harvests personal data."
  },
  {
    id: 138,
    sender: "LinkedIn",
    message: "Congratulations! Your application for Software Engineer at Google was viewed by a recruiter. Check status at linkedin.com/jobs.",
    type: "safe",
    explanation: "Standard LinkedIn application status notification. Provides specific company and role and links to the official LinkedIn jobs page."
  },
  {
    id: 139,
    sender: "FREE-TRIAL",
    message: "Your FREE 3-day trial at PremiumStreamingHub.com is ending. Cancel now or be charged $49.99/month: cancel-subscription.net",
    type: "scam",
    explanation: "Phantom subscription scams — you're being told to cancel a service you never signed up for. Clicking 'cancel' actually signs you up. Any unknown recurring charge is a billing scam."
  },
  {
    id: 140,
    sender: "Southwest",
    message: "Rapid Rewards: You've earned 1,247 bonus points from your last flight. Redeem at southwest.com/rapidrewards.",
    type: "safe",
    explanation: "Standard Southwest Rapid Rewards points notification with specific point amount and link to the official southwest.com rewards page."
  },
  {
    id: 141,
    sender: "GIFT",
    message: "Your coworker sent you a $50 Amazon gift card for your work anniversary! Claim: amazon-gift-delivery.net",
    type: "scam",
    explanation: "Amazon gift cards are delivered through Amazon.com with real redemption codes, not third-party .net sites. This is a gift card scam designed to redirect you to a phishing page."
  },
  {
    id: 142,
    sender: "Mailchimp",
    message: "Mailchimp: Your 'January Newsletter' campaign was opened by 234 subscribers (28.4% open rate). View report at mailchimp.com.",
    type: "safe",
    explanation: "Standard Mailchimp campaign analytics notification with specific open count and rate. Links to the official mailchimp.com analytics page."
  },
  {
    id: 143,
    sender: "URGENT",
    message: "LAST CHANCE: Your credit score has dropped 47 points. Fix it NOW at credit-repair-instant.com or permanent damage.",
    type: "scam",
    explanation: "Credit score services don't notify by random SMS. 'Permanent damage' is impossible — scores fluctuate naturally. Credit repair scams charge monthly fees for services you can do yourself free."
  },
  {
    id: 144,
    sender: "GitHub",
    message: "GitHub Actions: Your workflow 'CI/CD Pipeline' on main succeeded in 4m 23s. View at github.com/your-repo/actions.",
    type: "safe",
    explanation: "Standard GitHub Actions workflow completion notification with specific duration and link to the official GitHub repository actions page."
  },
  {
    id: 145,
    sender: "TRANSFER",
    message: "International Money Transfer: $3,200 was sent to your bank account from Nigeria. Claim at western-union-funds.com",
    type: "scam",
    explanation: "This is a classic advance-fee fraud (419 scam). The money doesn't exist. Clicking the link requires you to pay 'fees' or 'taxes' to release the funds, which are never sent."
  },
  {
    id: 146,
    sender: "Netflix",
    message: "New to Netflix: 'Stranger Things Season 5' is now available! Watch at netflix.com.",
    type: "safe",
    explanation: "Standard Netflix new content notification. Links to the official netflix.com platform with no credential requests or suspicious external links."
  },
  {
    id: 147,
    sender: "CASHBACK",
    message: "You have unclaimed cashback of $124.57 from your credit card. Claim at credit-card-cashback-claim.com",
    type: "scam",
    explanation: "Cashback rewards are automatically applied to your account or redeemable in your bank/card app. Third-party 'cashback claim' sites are credential phishing pages."
  },
  {
    id: 148,
    sender: "Hertz",
    message: "Hertz: Your vehicle rental at LAX (Confirmation #K2847592) is confirmed for Jan 20. Manage at hertz.com/reservations.",
    type: "safe",
    explanation: "Standard car rental confirmation with confirmation number, airport code, date, and link to the official hertz.com reservations page."
  },
  {
    id: 149,
    sender: "PASSWORD",
    message: "Your Facebook password was just changed. If this wasn't you, recover at: facebook-account-help.net/recover",
    type: "scam",
    explanation: "Facebook security alerts come from facebook.com, not .net domains. If you receive a real Facebook security alert, go directly to facebook.com — never click links in texts claiming to be Facebook."
  },
  {
    id: 150,
    sender: "Ahrefs",
    message: "Ahrefs Alert: Your site yourdomain.com gained 47 new backlinks this week. View in dashboard: app.ahrefs.com.",
    type: "safe",
    explanation: "Standard SEO tool notification from the official Ahrefs service. Contains specific site domain and link count with link to the official app.ahrefs.com dashboard."
  }
];

export const seedSmsMessages = () => {
  if (!localStorage.getItem(SMS_MESSAGES_KEY)) {
    localStorage.setItem(SMS_MESSAGES_KEY, JSON.stringify(smsMessagesDataset));
  }
};

export const getSmsMessages = () => {
  const stored = localStorage.getItem(SMS_MESSAGES_KEY);
  if (stored) return JSON.parse(stored);
  seedSmsMessages();
  return smsMessagesDataset;
};
