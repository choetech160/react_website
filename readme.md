# React website

I created this website out of boredom.  This is a full working website, currently accessible. There are still a few bugs in it that I could fix, but I learned what I wanted to learn. This being

- Implementation of a working payment system (Stripe)
- Implementation of a back-end (AWS lambda, API Gateway, SES, S3)
- Secure login
- Get better at CSS



Front page

![front_page](/Images/front_page.png)



Full page

![full](/home/home-system-76/Projects/PRIVACY/practice/Public_version/Images/full.png)



Language option

![languages](/home/home-system-76/Projects/PRIVACY/practice/Public_version/Images/languages.png)



Login page

![login](/home/home-system-76/Projects/PRIVACY/practice/Public_version/Images/login.png)



Mobile friendly

![mobile_friendly](/home/home-system-76/Projects/PRIVACY/practice/Public_version/Images/mobile_friendly.png)



mobile menu 

![mobile_friendly_menu](/home/home-system-76/Projects/PRIVACY/practice/Public_version/Images/mobile_friendly_menu.png)

### Start locally

Clone the repo, `cd` into it.

```bash
npm install
npm start
```

The back-end is receiving emails on SES, saving them to S3 and forwarding them to your current email address.  This allows you to protect your true email from scams, shady website etc.

