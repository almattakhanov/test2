export default {
    profile: 'Profile',
    catalog: 'Catalog',
    city: 'Bishkek',
    search: 'Search',
    cart: 'Cart',
    favorites: 'Favorites',
    logout: 'Logout',
    login: 'Login',
    outOfStock: 'Out of stock',
    yes: 'Yes',
    cancellation: 'Cancellation',
    noData: 'No data',
    close: 'Close',

    subscription: {
        manage: 'Subscription management',
        subscribe: 'Subscribe to newsletter with discounts and promotions',
        subscribeButton: 'Subscribe',
    },

    address: {
        myAddresses: 'My Addresses',
        makeMain: 'Set as default',
        main: 'Default',
        addAddress: 'Add address',
        setDefaultSuccess: "The address is set as the primary address!",
        setDefaultError: "Failed to set the default address",
        edit: 'Edit',
        delete: 'Delete',
        deleteSuccess: 'Address deleted!',
        deleteError: 'Failed to delete address',
        deleteAddress: 'Do you really want to delete the address?',
        updateSuccess: 'Address updated successfully',
        updateError: 'Error updating address',
        addressSuccessfullyAdded: 'Address added successfully',
        errorSavingAddress: 'Error saving address',
        failedToSaveAddress: 'Failed to save address',
        pleaseTryAgain: 'Please try again',

        addressModule: {
            titleAdd: 'Add Address',
            titleEdit: 'Edit Address',
            streetLabel: 'Street, House',
            streetPlaceholder: 'Enter full address',
            streetRequired: 'Please enter the address',
            apartmentLabel: 'Apartment/Office',
            apartmentPlaceholder: 'Number',
            apartmentRequired: 'Please enter the number',
            entranceLabel: 'Entrance',
            entrancePlaceholder: 'Entrance number',
            codeLabel: 'Intercom Code',
            codePlaceholder: 'Access code',
            floorLabel: 'Floor',
            floorPlaceholder: 'Floor number',
            commentLabel: 'Comment',
            commentPlaceholder: 'Enter a comment for the address',
            successAddMessage: 'Address added successfully!',
            errorSaveTitle: 'Failed to save address',
            errorSaveDescription: 'Please try again',
            saveButton: 'Save',
            saveChangesButton: 'Save changes',
        },
    },

    user: {
        profileTitle: 'Personal Information',
        firstName: 'First Name',
        enterFirstName: 'Enter first name',
        lastName: 'Last Name',
        enterLastName: 'Enter last name',
        phoneNumber: 'Phone Number',
        saving: 'Saving...',
        save: 'Save',
        deleteAccount: 'Delete Account',
        success: 'Success',
        error: 'Error',
        dataUpdated: 'Data updated successfully!',
        dataUpdateError: 'Error updating data',
    },

    orders: {
        title: 'My Orders',
        orderNumber: 'Order Number',
        date: 'Date',
        status: 'Status',
        price: 'Price',
        quantity: 'Quantity',
        details: 'Details',
    },
    status: {
        paid: 'Paid',
        pending_payment: 'Pending Payment',
        delivered: 'Delivered',
    },

    security: {
        title: 'Security',
        logoutAllSessions: 'Log out of all sessions',
    },

    account: {
        logoutButton: 'Logout from account',
    },

    contacts: {
        phone: '8585',
        email: 'info@bakai.store',

        title: "Contacts",
        description: "If you have any questions or need additional information, please contact our call center at 8585 (free from mobile phones).",
        workingHoursTitle: "Working hours:",
        workingHours: "daily from 9:00 to 21:00"


    },
    footer: {
        buyers: 'For Buyers',
        order: 'How to order?',
        paymentDelivery: 'Payment & Delivery',
        returnPolicy: 'Return Policy',
        partners: 'For Partners',
        rules: 'Partnership Terms',
        becomeSeller: 'Become a Seller',
        about: 'About Us',
        aboutCompany: 'About the Company',
        securityPolicy: 'Security Policy',
        offer: 'Public Offer',
        contacts: 'Contacts',
    },

    placeOrder: {
        title: 'How to Place an Order',
        steps: {
            registration: {
                title: 'Registration',
                description: 'To place an order, register on the Bakai Store platform. It takes just a few minutes and opens access to order placement and tracking.',
            },
            selection: {
                title: 'Selecting Products',
                description: 'Choose the desired category or use the search. Review seller offers and pick the best option for you.',
            },
            checkout: {
                title: 'Checkout',
                description: 'After selecting a product, add it to the cart, specify delivery details, and choose a payment method.',
            },
            delivery: {
                title: 'Receiving Your Order',
                description: 'After placing your order, wait for delivery or pick up the item at the pickup point.',
            },
        },
    },

    payment: {
        title: 'Payment Methods',
        methods: {
            cardOrCash: {
                title: 'Payment by Card or Cash',
                description: 'You can pay for your order by any convenient method: bank card or cash upon delivery.',
            },
            installment: {
                title: 'Installment and Credit',
                description: 'Payment by installment or credit for up to 12 months is available (if offered by the seller).',
            },
        },
    },
    delivery: {
        title: 'Delivery Methods',
        methods: {
            pickup: {
                title: 'Pickup',
                description: 'Pick up the item yourself by choosing a convenient pickup point. Working hours are indicated under the store address.',
            },
            shipping: {
                title: 'Shipping',
                description: 'Delivery is free for all orders. Specify city, street, house/apartment number, and additional comments if necessary.',
            },
        },
    },

    exchangeReturn: {
        title: 'Product Exchange and Return',
        intro: 'If you need to exchange or return a product, please contact the seller directly from whom you purchased the product.',
        goodQualityTitle: 'Exchange and Return of Products in Proper Condition',
        goodQualityDescription: 'You can return the product within 14 days if it:',
        goodQualityConditions: {
            notUsed: 'has not been used,',
            maintainedAppearance: 'has retained its appearance and consumer properties,',
            hasSeals: 'has seals and tags (if any),',
            hasProofOfPurchase: 'you have a document confirming the purchase.',
        },
        nonReturnableTitle: 'Categories of Products Not Subject to Return:',
        nonReturnableDescription: 'subscriber communication devices, medicines and medical products, underwear, hosiery, as well as products that are not subject to return according to the legislation of the Kyrgyz Republic (for example, fabrics, measured goods, ribbons, wires, cables, film, linoleum, moldings, etc.).',
        returnCondition: 'When returning, the product must be defect-free, in its original packaging and complete.',

        defectiveTitle: 'Exchange and Return of Defective Products (Factory Defect)',
        defectiveDescriptionPart1: 'If defects or malfunctions are detected during use, please contact the authorized service center of the manufacturer.',
        defectiveDescriptionPart2: 'If you have difficulties with the return, contact the Call-center at',
        callCenterNumber: '8585',

        cardPaymentTitle: 'Product Return When Paid by Card',
        cardPaymentDescription: 'To return a product, contact the store where you received it. Present the invoice or receipt and get the original return invoice from the seller.',
        cardPaymentConditions: {
            within14Days: 'If the return is made within 14 days, the money will be refunded to the card within 10 calendar days.',
            after14Days: 'If the return is made after 14 days (due to factory defect and with a service center certificate), the money will be refunded by the seller.',
        },
    },

    about: {
        title: 'About Bakai Store',
        intro:
            'is a modern online trading platform created for convenient, profitable, and safe shopping. We connect sellers and buyers by providing a reliable digital service. This is a digital service developed in Kyrgyzstan specifically for the convenience of our users.',
        missionTitle: 'Our Mission',
        missionText:
            'To give every customer the opportunity to shop conveniently and profitably, and to help sellers grow their business using our modern tools.',
        goalTitle: 'Our Goal',
        goalText:
            'To become a reliable partner for customers and sellers, and a leader in e-commerce in Kyrgyzstan. We value every buyer and seller, building long-term and mutually beneficial relationships.',
        valuesTitle: 'Our Values',
        valuesText:
            'Transparency, reliability, and customer care. We believe that high-quality service and a convenient online experience will help you shop with joy and confidence.',
    },

    oferta: {
        title: "Public Offer",
        section1: {
            title: "Article 1. GENERAL PROVISIONS",
            paragraph:
                "The information published on the Bakai Market trading platform (hereinafter referred to as the Marketplace) contains the terms of the offer to purchase goods and constitutes a public offer in accordance with paragraph 2 of Article 398 of the Civil Code of the Kyrgyz Republic (hereinafter referred to as the Civil Code). The Buyer's acceptance is considered to be the placement of an order for the offered goods (Article 399 of the Civil Code). The Marketplace operates in accordance with the Civil Code, the Law of the Kyrgyz Republic No. 90 dated 05.12.1997 'On Consumer Rights Protection' (hereinafter — Law No. 90), the Trade Rules for certain types of goods approved by the Resolution of the Government of the KR No. 560 dated 30.09.2014 (hereinafter — Rules No. 560), and other applicable laws of the Kyrgyz Republic."
        },
        section2: {
            title: "Article 2. TERMS DEFINITION",
            marketplace:
                "Marketplace — a trading platform where information about goods is provided by several third parties, while operations are processed by a single operator. It is a software and hardware complex of organizational, informational, and technical solutions ensuring the interaction of the Seller and the Buyer through electronic communication channels. It provides the Buyer with all necessary information via the Internet for making a purchase, including the range of goods, prices, payment and delivery methods, and also accepts purchase requests from Buyers via the Internet or by phone and ensures delivery either to the Buyer's specified address or a pickup point.",
            seller:
                "Seller — a legal entity or an individual entrepreneur who has signed a partnership agreement with the Marketplace to sell goods by listing them on the Marketplace’s website or mobile app.",
            site:
                "Site — https://bakai.store — owned and administered by the Marketplace, it consists of logically connected web pages/mobile app that contain information about products and terms of purchase.",
            sellerPage:
                "Seller’s Page — a page containing information on terms of sale, delivery, and return of goods sold by the Seller, as well as other significant information for concluding and fulfilling a purchase agreement. It is accessible via a link located above the 'Buy in one click' button on the product page.",
            product:
                "Product — any tangible item or digital asset listed in the Marketplace’s catalog.",
            buyer:
                "Buyer — an individual who purchases/orders a product or intends to use it for personal, family, household, or other non-business purposes.",
            personalData:
                "Personal Data — information defined by the Law of the Kyrgyz Republic dated 14.04.2008 No. 58 'On Personal Information', voluntarily and knowingly provided by the Buyer when placing an order, necessary for its fulfillment by the Marketplace.",
            order:
                "Order — an electronic or verbal (phone) request by the Buyer to purchase goods from the Marketplace catalog, agreed upon by both parties and processed by the Marketplace operator.",
            services:
                "Services — a set of activities performed by the Marketplace for the Seller or Buyer aimed at fulfilling the terms of the sale, including but not limited to order delivery, order status updates, etc."
        },
        section3: {
            title: "Article 3. TERMS OF PRODUCT PURCHASE",
            intellectualProperty: "Intellectual Property Protection: All textual information and graphic images posted on the website or mobile application are the property of the Marketplace or the Seller.",
            catalog: "Electronic Catalog: Product description and price. The availability of goods presented in the Marketplace catalog is determined by the individual status of the product, displayed in the genre catalog and on the product detail page. All product information is for reference only and may not fully convey all features and characteristics. Photos, diagrams, drawings, and videos of product samples are the property of the Marketplace or the Seller. Screen settings and display characteristics may distort the color palette. Buyers may contact support for additional information, which can be provided by phone or email.",
            marketplaceInfo: "Marketplace Product Information: The website/application provides information on key consumer properties, price, purchase conditions, delivery, service life, shelf life, warranty period, payment procedures, and the Seller.",
            responsibility: "Responsibility for Information Accuracy: Each party is responsible for the accuracy of the information they provide. The Marketplace is not responsible for the accuracy of data entered by the Buyer during registration or order creation. Valid data must be provided to place an order. Sales are carried out in real time and may be subject to price and availability changes without prior notice. A product is reserved only after order processing.",
            saleMoment: "Moment of Sale: Obligations between the Marketplace and Buyer commence upon receipt of an order confirmation or prepayment, and the sale is considered finalized upon issuance of a receipt or sales slip. The Seller is responsible for product quality, and misuse releases the Seller from liability.",
            order: "Product Order: Orders may be placed via cart, order form, or phone call to an operator. Obligations arise after agreement on the order details and verification of data. Changes to the order are possible only after mutual confirmation.",
            itemRemoval: "Cases of Item Removal from Order: The Marketplace informs the Buyer about product shortages, defects, seller liquidation, production delays, legal restrictions, and other issues.",
            delivery: "Delivery and Product Receipt: Delivery method is agreed upon when placing the order. Delivery changes are possible three hours in advance. The Marketplace may engage third parties for delivery; the postal service is responsible for the safety of shipments. Upon receiving the product via courier or pickup point, the Buyer may inspect the product and refuse it if quality or completeness is not satisfactory. In case of refusal after payment, re-delivery is available only after an additional payment.",
            return: "Product Refusal and Return: The Buyer may refuse the product before its transfer. Refusal is not allowed for high-quality products with individually defined characteristics and technically complex items."
        },
        section4: {
            title: "Article 4. DEFECTIVE PRODUCT",
            paragraph1: "If the Buyer has claims regarding the quality of the product, they must contact the Marketplace's partner service center (hereinafter – Service Center, SC) provided the warranty card has not expired. The diagnostic period at the SC is ten working days. To accept the product for diagnostics and warranty repair, the Buyer must provide the SC with the following (part 5, article 17 of Law No. 90): a sales or cash receipt or a document confirming payment in non-cash form;",
            paragraph2: "Technical passport or another replacing document;",
            paragraph3: "Warranty card;",
            paragraph4: "Product packaging with preserved identification marks;",
            paragraph5: "Component parts (if any);",
            paragraph6: "The purchased product itself.",
            paragraph7: "The warranty repair period at the SC is 30 calendar days from the date of Buyer's claim excluding transportation time. If the SC lacks necessary spare parts, the warranty repair period extends up to 40 days from the claim date. Buyer's right to temporary use of a replacement product during repair does not apply to goods listed in the “List of durable goods…” approved by the Kyrgyz Government Resolution No. 667 dated 12.10.1998:",
            paragraph8: "Children’s goods: toys, strollers, bicycles for children, their parts; video games; personal household computers for children; household items made of polymer and synthetic materials; heating and hot water equipment, plumbing: heating devices (stoves), heating boilers, water heaters and columns; sanitary equipment made of metal, polymers, faience, semi-porcelain and porcelain; sanitary fittings and accessories;",
            paragraph9: "Household items: sofas, couches, divans, sofa beds, mattresses, wardrobes, furniture sets, synthetic carpet products, floor coverings. Electrical household appliances (excluding primary elements and batteries);",
            paragraph10: "Sports goods: sports equipment; sports shoes and clothing; recreational vessels and watercraft, their parts; non-military hand weapons. Household radio-electronic devices; computing and multiplying equipment; musical instruments.",
            paragraph11: "According to interstate standard GOST 27418-87 “Household radio-electronic equipment. Terms and definitions,” approved by the Eurasian Economic Commission decision No. 292 dated 25.12.2012, which includes the Kyrgyz Republic, a “household radio-electronic device” means a radio-electronic device used by consumers at home to perform one or more functions: receiving, processing, synthesizing, recording, amplifying, reproducing radio/TV programs, wired broadcast programs, phonograms/videograms, and special signals. Such devices include mobile phones, navigators, computers, printers, faxes, TVs, radios, dictaphones, video recorders, tablets, and other radio/computing/multiplying devices intended for personal/family use not related to business or other economic activity.",
        },

        section5: {
            title: "Article 5. ADDITIONAL CONDITIONS",
            paragraph1: "The Marketplace website/mobile application and provided services may be temporarily partially or fully unavailable due to preventive or other maintenance works, or other technical reasons. The Marketplace’s technical service has the right to periodically perform necessary maintenance or other works with or without prior notice to Buyers.",
        }

    },
    infoSecurityPolicy: {
        title: 'INFORMATION SECURITY POLICY',

        intro: 'This Information Security Policy applies to all information that the online marketplace “Bakai Store”, located at the domain bakai.store, may obtain about the User during the use of the marketplace application, software, and products.',

        section1: {
            "title": "1. DEFINITIONS",
            "intro": "The following terms are used in this Information Security Policy:",
            "1": "Website administration — authorized employees acting on behalf of 'Bakai Store', who manage the marketplace, organize and/or carry out personal data processing, and determine the purposes, composition, and operations with such data.",
            "2": "Personal data — any information relating to an identified or identifiable natural person (data subject).",
            "3": "Processing of personal data — any action or set of actions performed with personal data, with or without automation tools, including collection, recording, systematization, accumulation, storage, clarification (updating, modification), retrieval, use, transfer (distribution, provision, access), anonymization, blocking, deletion, destruction.",
            "4": "Confidentiality of personal data — the mandatory requirement for the Operator or any third party who has access to personal data not to disclose it without the consent of the data subject or other legal grounds.",
            "5": "Online store user — an individual who accesses the marketplace via the Internet and uses its functionality.",
            "6": "Cookies — a small data fragment sent by the web server and stored on the user's device, sent back to the server with each subsequent HTTP request.",
            "7": "IP address — a unique network address of a device in a network based on the IP protocol."
        },

        section2: {
            title: '2. GENERAL PROVISIONS',
            "1": '2.1. The User’s use of the online marketplace website implies agreement with this Information Security Policy and the terms of personal data processing.',
            "2": '2.2. If the User does not agree with the Policy, they must stop using the website.',
            "3": '2.3. This Policy applies only to the “Bakai Store” website. The marketplace is not responsible for third-party websites that may be linked.',
            "4": '2.4. The Website Administration does not verify the accuracy of personal data provided by the User.',
        },
        section3: {
            title: '3. SUBJECT OF THE INFORMATION SECURITY POLICY',
            "1": '3.1. This Policy defines the obligations of the Website Administration to keep personal data confidential as provided by the User.',
            "2": '3.2. The data permitted for processing includes: full name; phone number; email address; delivery address; place of residence.',
            "3": '3.3. The marketplace also protects data transmitted automatically during browsing: IP address; cookies; browser info; access time; page address; referrer.',
            "3.1": '3.3.1. Disabling cookies may limit access to sections that require authorization.',
            "3.2": '3.3.2. IP collection is used for technical diagnostics and verifying transactions.',
            "4": '3.4. Other data (e.g. purchase history, browser types) is securely stored and not disclosed, except as stated in clauses 5.2 and 5.3.',
        },

        section4: {
            title: "4. PURPOSES OF COLLECTING USER PERSONAL DATA",
            "1": "4.1. The administration of the online market website may process the user's personal data for the following purposes:",
            "1.1": "4.1.1. Identifying the user registered on the online market website to place an order remotely.",
            "1.2": "4.1.2. Providing the user access to personalized resources of the online market website.",
            "1.3": "4.1.3. Establishing communication with the user, including sending notifications, inquiries regarding the use of the online market website, provision of services, and processing user requests and applications.",
            "1.4": "4.1.4. Determining the user's location to ensure security and prevent fraud.",
            "1.5": "4.1.5. Verifying the accuracy and completeness of the personal data provided by the user.",
            "1.6": "4.1.6. Creating a user account for purchases if the user consents to account creation.",
            "1.7": "4.1.7. Notifying the user about the status of an order.",
            "1.8": "4.1.8. Processing and receiving payments, confirming payment, disputing payments, determining eligibility for credit (installment) by the user.",
            "1.9": "4.1.9. Providing efficient customer and technical support to the user in case of problems related to the use of the online market website.",
            "1.10": "4.1.10. Providing the user, with their consent, updates about products, special offers, pricing information, newsletters, and other information on behalf of the online market or its partners.",
            "1.11": "4.1.11. Conducting advertising activities with the user's consent.",
            "1.12": "4.1.12. Providing access to the user to websites or services of the online market's partners to receive products, updates, and services."
        },

        section5: {
            title: "5. METHODS AND TERMS OF PERSONAL DATA PROCESSING",
            "1": "5.1. The processing of the user's personal data is carried out lawfully and without limitation of time, including using automated or non-automated means in information systems of personal data.",
            "2": "5.2. The administration of the online market website has the right to transfer personal data to third parties, including courier services, postal organizations, and telecom operators, solely for the purpose of fulfilling the user's order placed on the 'Bakai Store' online market website, including product delivery.",
            "3": "5.3. Personal data may be transferred to authorized state bodies of the Kyrgyz Republic only on the grounds and in the manner established by the legislation of the Kyrgyz Republic.",
            "4": "5.4. In case of loss or disclosure of personal data, the administration informs the user about the incident.",
            "5": "5.5. The administration takes the necessary organizational and technical measures to protect the user's personal information from unauthorized or accidental access, destruction, alteration, blocking, copying, distribution, as well as from other unlawful actions of third parties.",
            "6": "5.6. The administration together with the user takes all necessary measures to prevent losses or other negative consequences caused by the loss or disclosure of the user's personal data."
        },

        section6: {
            title: "6. OBLIGATIONS OF THE PARTIES",
            "1": "6.1. The User is obliged to:",
            "1.1": "6.1.1. Provide personal data necessary for using the online market website.",
            "1.2": "6.1.2. Update and supplement the provided personal data in case of changes.",
            "2": "6.2. The Administration of the website is obliged to:",
            "2.1": "6.2.1. Use the received information exclusively for the purposes stated in section 4 of this Information Security Policy.",
            "2.2": "6.2.2. Keep confidential information secret, not disclose it without prior written permission from the User, and not sell, exchange, publish, or disclose the User’s personal data by other means, except as stated in clauses 5.2 and 5.3 of this Policy.",
            "2.3": "6.2.3. Register the received personal data of each User in strict accordance with the established Registry of Holders of Personal Data Arrays at the State Agency for Personal Data Protection under the Cabinet of Ministers of the Kyrgyz Republic.",
            "2.4": "6.2.4. Block the personal data related to the relevant User upon the User’s or their lawful representative’s or authorized body’s request, or upon detection of false data or unlawful actions, for the duration of verification."
        },

        section7: {
            title: "7. RESPONSIBILITY OF THE PARTIES",
            "1": "7.1. The Administration of the website that fails to fulfill its obligations is liable for damages incurred by the User due to unlawful use of personal data, in accordance with the legislation of the Kyrgyz Republic, except cases provided for in clauses 5.2, 5.3, and 7.2 of this Policy.",
            "2": "7.2. In case of loss or disclosure of personal data, the Administration is not liable if such information:",
            "2.1": "7.2.1. Became public before its loss or disclosure;",
            "2.2": "7.2.2. Was received from a third party before it was obtained by the Administration;",
            "2.3": "7.2.3. Was disclosed with the User’s consent."
        },

        section8: {
            title: "8. DISPUTE RESOLUTION",
            "1": "8.1. Before filing a lawsuit on disputes arising from relations between the User and the Administration of the online market website, a claim (written proposal for voluntary dispute settlement) must be submitted.",
            "2": "8.2. The recipient of the claim must notify the claimant in writing of the results of the claim consideration within 30 calendar days of receipt.",
            "3": "8.3. If no agreement is reached, the dispute shall be referred to the court in accordance with the current legislation of the Kyrgyz Republic.",
            "4": "8.4. This Information Security Policy and relations between the User and the Administration are governed by the current legislation of the Kyrgyz Republic."
        },
        section9: {
            title: "9. FINAL PROVISIONS",
            "1": "9.1. If, as a result of changes in the legislation of the Kyrgyz Republic, certain provisions of the Information Security Policy conflict with the current legislation of the Kyrgyz Republic, these provisions shall lose force, and until changes are made to the Information Security Policy, the current legislation of the Kyrgyz Republic shall apply.",
            "2": "9.2. Issues not regulated by this Information Security Policy are governed by other internal normative documents of the online market Administration. In case of contradictions between them and the Information Security Policy, the latter shall prevail.",
            "3": "9.3. Issues not settled by this Information Security Policy shall be resolved in accordance with the legislation of the Kyrgyz Republic and the internal normative documents of the online market Administration.",
            "4": "9.4. Control over compliance with the requirements established by the Information Security Policy is entrusted to the Administration of the online market “Bakai Store”.",
            "5": "9.5. The website Administration has the right to make changes to this Information Security Policy without the User's consent.",
            "6": "9.6. The Information Security Policy is reviewed as necessary, but at least once every 2 years."
        }


    },

    becomeSeller: {
        "title": "Become a Seller on Bakai.Store",
        "description": "Sell your products and services across the country via the Bakai.Store marketplace. Simple registration process, transparent terms, and support at every step.",
        "benefits": {
            "audience": "1) Access to a large audience of Bakai Bank clients",
            "installment": "2) Sell with installment and credit options",
            "dashboard": "3) Convenient dashboard for managing orders and products",
            "support": "4) 7-day-a-week customer support"
        },
        "cta": "Want to get started? Leave a request and our team will contact you shortly.",
        "questions": "Questions? Call",
        "mobileFree": "(free from mobile)"
    },

    partnerAgreement: {
        "title": "Adhesion Agreement",
        "intro1": "This adhesion agreement regulates the relationship between Bakai Market LLC and the Partner who places goods and/or services on the Bakai Store electronic marketplace. Signing the Application means acceptance of this Agreement.",
        "intro2": "The agreement takes effect upon confirmation by the Organization and remains valid indefinitely. The Organization may refuse to conclude the Agreement without providing reasons.",
        "download": "Download agreement (.docx)"
    },
    validation: {
        requiredField: "Required field",
        invalidEmail: "Invalid email",
        invalidName: "Name must contain only letters without spaces or special characters",
    },


} as const
