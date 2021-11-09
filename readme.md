# React website

I created this website out of boredom.  This is a full working website, currently accessible. There are still a few bugs in it that I could fix, but I learned what I wanted to learn. This being

- Implementation of a working payment system (Stripe)
- Implementation of a back-end (AWS lambda, API Gateway, SES, S3)
- Secure login
- Get better at CSS



Front page

![front_page](/Images/front_page.png)



Full page

![full](/Images/full.png)



Language option

![languages](/Images/languages.png)



Login page

![login](/Images/login.png)



Mobile friendly

![mobile_friendly](/Images/mobile_friendly.png)



mobile menu 

![mobile_friendly_menu](/Images/mobile_friendly_menu.png)

### Start locally

Clone the repo, `cd` into it.

```bash
npm install
npm start
```

The back-end is receiving emails on SES, saving them to S3 and forwarding them to your current email address.  This allows you to protect your true email from scams, shady website etc.

