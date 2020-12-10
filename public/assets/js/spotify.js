let price = {
    "Individual": [{
            price: "1.50",
            users: "1",
            link: "",
            shoppyId: "" // LEAVE THIS BLANK IF YOU'RE NOT USING SHOPPY EMBEDS
        },
        {
            price: "2.00",
            users: "3",
            link: "",
            shoppyId: ""
        },
        {
            price: "5.00",
            users: "5",
            link: "",
            shoppyId: ""
        }
    ],
    "Reseller": [{
            price: "13.00",
            users: "20",
            link: "",
            shoppyId: ""
        },
        {
            price: "16.50",
            users: "30",
            link: "",
            shoppyId: ""
        },
        {
            price: "34.80",
            users: "60",
            shoppyId: ""
        }
    ]
}

let isShoppy = price.Individual[0].shoppyId !== ""

function switcheroo(ev) {
    for (let i = 0; i < ev.parentElement.children.length; i++) {
        let ch = ev.parentElement.children[i];
        if (ch === ev)
            ch.classList.add('active')
        else
            ch.classList.remove('active')
    }
    if (isShoppy) {
        $('#a1').removeAttr("href");
        $('#a1').css("cursor", "pointer");
        $('#a2').removeAttr("href");
        $('#a2').css("cursor", "pointer");
        $('#a3').removeAttr("href");
        $('#a3').css("cursor", "pointer");
    }
    if (ev.innerText.toLowerCase() === "reseller") {
        $('#p1').text(price.Reseller[0].price)
        $('#u1').text(`${price.Reseller[0].users} users`)
        $('.l1').html(price.Reseller[0].users);
        $('#a1').unbind( "click" );
        if (isShoppy) $('#a1').click(() => {
            shoppy.launch(price.Reseller[0].shoppyId)
        })
        else $('#a1').attr("href", price.Reseller[0].link)

        $('#p2').text(price.Reseller[1].price)
        $('#u2').text(`${price.Reseller[1].users} users`)
        $('.l2').html(price.Reseller[1].users);
        $('#a2').unbind( "click" );
        if (isShoppy) $('#a2').click(() => {
            shoppy.launch(price.Reseller[1].shoppyId)
        })
        else $('#a2').attr("href", price.Reseller[1].link)

        $('#p3').text(price.Reseller[2].price)
        $('#u3').text(`${price.Reseller[2].users} users`)
        $('.l3').html(price.Reseller[2].users);
        $('#a3').unbind( "click" );
        if (isShoppy) $('#a3').click(() => {
            shoppy.launch(price.Reseller[1].shoppyId)
        })
        else $('#a3').attr("href", price.Reseller[1].link)
    } else {
        $('#p1').text(price.Individual[0].price)
        $('#u1').text(`${price.Individual[0].users} user(s)`)
        $('.l1').html(price.Individual[0].users);
        $('#a1').unbind( "click" );
        if (isShoppy) $('#a1').click(() => {
            shoppy.launch(price.Individual[0].shoppyId)
        })
        else $('#a1').attr("href", price.Individual[0].link)

        $('#p2').text(price.Individual[1].price)
        $('#u2').text(`${price.Individual[1].users} users`)
        $('.l2').html(price.Individual[1].users);
        $('#a2').unbind( "click" );
        if (isShoppy) $('#a2').click(() => {
            shoppy.launch(price.Individual[1].shoppyId)
        })
        else $('#a2').attr("href", price.Individual[1].link)


        $('#p3').text(price.Individual[2].price)
        $('#u3').text(`${price.Individual[2].users} users`)
        $('.l3').html(price.Individual[2].users);
        $('#a3').unbind( "click" );
        if (isShoppy) $('#a3').click(() => {
            shoppy.launch(price.Individual[2].shoppyId)
        })
        else $('#a3').attr("href", price.Individual[2].link)
    }
}

const countryMap = {"BD": "Bangladesh", "BE": "Belgium", "BF": "Burkina Faso", "BG": "Bulgaria", "BA": "Bosnia and Herzegovina", "BB": "Barbados", "WF": "Wallis and Futuna", "BL": "Saint Barthelemy", "BM": "Bermuda", "BN": "Brunei", "BO": "Bolivia", "BH": "Bahrain", "BI": "Burundi", "BJ": "Benin", "BT": "Bhutan", "JM": "Jamaica", "BV": "Bouvet Island", "BW": "Botswana", "WS": "Samoa", "BQ": "Bonaire, Saint Eustatius and Saba ", "BR": "Brazil", "BS": "Bahamas", "JE": "Jersey", "BY": "Belarus", "BZ": "Belize", "RU": "Russia", "RW": "Rwanda", "RS": "Serbia", "TL": "East Timor", "RE": "Reunion", "TM": "Turkmenistan", "TJ": "Tajikistan", "RO": "Romania", "TK": "Tokelau", "GW": "Guinea-Bissau", "GU": "Guam", "GT": "Guatemala", "GS": "South Georgia and the South Sandwich Islands", "GR": "Greece", "GQ": "Equatorial Guinea", "GP": "Guadeloupe", "JP": "Japan", "GY": "Guyana", "GG": "Guernsey", "GF": "French Guiana", "GE": "Georgia", "GD": "Grenada", "GB": "United Kingdom", "GA": "Gabon", "SV": "El Salvador", "GN": "Guinea", "GM": "Gambia", "GL": "Greenland", "GI": "Gibraltar", "GH": "Ghana", "OM": "Oman", "TN": "Tunisia", "JO": "Jordan", "HR": "Croatia", "HT": "Haiti", "HU": "Hungary", "HK": "Hong Kong", "HN": "Honduras", "HM": "Heard Island and McDonald Islands", "VE": "Venezuela", "PR": "Puerto Rico", "PS": "Palestinian Territory", "PW": "Palau", "PT": "Portugal", "SJ": "Svalbard and Jan Mayen", "PY": "Paraguay", "IQ": "Iraq", "PA": "Panama", "PF": "French Polynesia", "PG": "Papua New Guinea", "PE": "Peru", "PK": "Pakistan", "PH": "Philippines", "PN": "Pitcairn", "PL": "Poland", "PM": "Saint Pierre and Miquelon", "ZM": "Zambia", "EH": "Western Sahara", "EE": "Estonia", "EG": "Egypt", "ZA": "South Africa", "EC": "Ecuador", "IT": "Italy", "VN": "Vietnam", "SB": "Solomon Islands", "ET": "Ethiopia", "SO": "Somalia", "ZW": "Zimbabwe", "SA": "Saudi Arabia", "ES": "Spain", "ER": "Eritrea", "ME": "Montenegro", "MD": "Moldova", "MG": "Madagascar", "MF": "Saint Martin", "MA": "Morocco", "MC": "Monaco", "UZ": "Uzbekistan", "MM": "Myanmar", "ML": "Mali", "MO": "Macao", "MN": "Mongolia", "MH": "Marshall Islands", "MK": "Macedonia", "MU": "Mauritius", "MT": "Malta", "MW": "Malawi", "MV": "Maldives", "MQ": "Martinique", "MP": "Northern Mariana Islands", "MS": "Montserrat", "MR": "Mauritania", "IM": "Isle of Man", "UG": "Uganda", "TZ": "Tanzania", "MY": "Malaysia", "MX": "Mexico", "IL": "Israel", "FR": "France", "IO": "British Indian Ocean Territory", "SH": "Saint Helena", "FI": "Finland", "FJ": "Fiji", "FK": "Falkland Islands", "FM": "Micronesia", "FO": "Faroe Islands", "NI": "Nicaragua", "NL": "Netherlands", "NO": "Norway", "NA": "Namibia", "VU": "Vanuatu", "NC": "New Caledonia", "NE": "Niger", "NF": "Norfolk Island", "NG": "Nigeria", "NZ": "New Zealand", "NP": "Nepal", "NR": "Nauru", "NU": "Niue", "CK": "Cook Islands", "XK": "Kosovo", "CI": "Ivory Coast", "CH": "Switzerland", "CO": "Colombia", "CN": "China", "CM": "Cameroon", "CL": "Chile", "CC": "Cocos Islands", "CA": "Canada", "CG": "Republic of the Congo", "CF": "Central African Republic", "CD": "Democratic Republic of the Congo", "CZ": "Czech Republic", "CY": "Cyprus", "CX": "Christmas Island", "CR": "Costa Rica", "CW": "Curacao", "CV": "Cape Verde", "CU": "Cuba", "SZ": "Swaziland", "SY": "Syria", "SX": "Sint Maarten", "KG": "Kyrgyzstan", "KE": "Kenya", "SS": "South Sudan", "SR": "Suriname", "KI": "Kiribati", "KH": "Cambodia", "KN": "Saint Kitts and Nevis", "KM": "Comoros", "ST": "Sao Tome and Principe", "SK": "Slovakia", "KR": "South Korea", "SI": "Slovenia", "KP": "North Korea", "KW": "Kuwait", "SN": "Senegal", "SM": "San Marino", "SL": "Sierra Leone", "SC": "Seychelles", "KZ": "Kazakhstan", "KY": "Cayman Islands", "SG": "Singapore", "SE": "Sweden", "SD": "Sudan", "DO": "Dominican Republic", "DM": "Dominica", "DJ": "Djibouti", "DK": "Denmark", "VG": "British Virgin Islands", "DE": "Germany", "YE": "Yemen", "DZ": "Algeria", "US": "United States", "UY": "Uruguay", "YT": "Mayotte", "UM": "United States Minor Outlying Islands", "LB": "Lebanon", "LC": "Saint Lucia", "LA": "Laos", "TV": "Tuvalu", "TW": "Taiwan", "TT": "Trinidad and Tobago", "TR": "Turkey", "LK": "Sri Lanka", "LI": "Liechtenstein", "LV": "Latvia", "TO": "Tonga", "LT": "Lithuania", "LU": "Luxembourg", "LR": "Liberia", "LS": "Lesotho", "TH": "Thailand", "TF": "French Southern Territories", "TG": "Togo", "TD": "Chad", "TC": "Turks and Caicos Islands", "LY": "Libya", "VA": "Vatican", "VC": "Saint Vincent and the Grenadines", "AE": "United Arab Emirates", "AD": "Andorra", "AG": "Antigua and Barbuda", "AF": "Afghanistan", "AI": "Anguilla", "VI": "U.S. Virgin Islands", "IS": "Iceland", "IR": "Iran", "AM": "Armenia", "AL": "Albania", "AO": "Angola", "AQ": "Antarctica", "AS": "American Samoa", "AR": "Argentina", "AU": "Australia", "AT": "Austria", "AW": "Aruba", "IN": "India", "AX": "Aland Islands", "AZ": "Azerbaijan", "IE": "Ireland", "ID": "Indonesia", "UA": "Ukraine", "QA": "Qatar", "MZ": "Mozambique"}
$(document).ready(() => {
    if (isShoppy) {
        var script = document.createElement("script");
        script.src = "https://shoppy.gg/api/embed.js";
        document.head.appendChild(script);
    }
    $('#indiv').length ? $('#indiv').click() : false;
    $('#results').hide()
    $('#submit').click(() => {
        $('#submit').attr("disabled", true);
        let data = {
            country: $('#countryoptions').val(),
            key: $('#upgradekey').val()
        }
        if ($('#email').length) data["email"] = $('#email').val()
        $.ajax({
            type: "POST",
            url: `/api/upgrade`,
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: (data) => {
                $('#form').hide()
                $('#results').show()
                $('#response').click()
                $('#title').text('Successfully Upgraded')
                $('#address').text(data.address)
                $('#inviteurl').attr('href', data.inviteURL);
                $('#inviteurl').on('click', () => {window.open($('#inviteurl').attr('href'), '_blank')})
                let disableConfirmation = false;
                window.addEventListener('beforeunload', event => {
                    const confirmationText = 'Are you sure?';
                    if (!disableConfirmation) {
                        event.returnValue = confirmationText;
                        return confirmationText;
                    } else {
                        disableConfirmation = false;
                    }
                });
                document.addEventListener('click', event => {
                    if (event.target.tagName.toLowerCase() === 'a') {
                        disableConfirmation = true;
                    }
                });
                document.addEventListener('submit', event => {
                    disableConfirmation = true;
                });
            },
            error: function (request) {
                let errorMsg = JSON.parse(request.responseText).message;
                new Noty({
                    type: 'error',
                    layout: 'topRight',
                    theme: 'sunset',
                    timeout: 3000,
                    progressBar: true,
                    text: errorMsg
                }).show();
            },
            complete: () => {
                $('#submit').attr("disabled", false);
            }
        })
    })
    $.ajax({
        type: "GET",
        url: "/api/stock",
        success: (data) => {
            $.get(`https://ipapi.co/country_code/`, function(usersCountry) {
                let stockHTML = ""
                let optionMenuHTML =
                    `<option selected disabled class="form-control">Select a country</option>`
                for (let c of data.stock.sort(function(a, b){return a.name-b.name})) {
                    let name = c.name.toUpperCase();
                    
                    let extraContent = ""
                    if (c.stock === 0) extraContent += " disabled"
                    if (name === usersCountry) extraContent += " selected"

                    countryMap[name] !== undefined ? name = countryMap[name] : false;
                    optionMenuHTML +=`<option value="${c.name}" class="form-control"${extraContent}>${name} - ${c.stock}</option>`;
                    stockHTML += `${name} - ${c.stock}<br>`
                }
                $('#countryoptions').html(optionMenuHTML);
                $('#stock').html(stockHTML);
            }, "text").fail(function() {
                let stockHTML = ""
                let optionMenuHTML =
                    `<option selected disabled class="form-control">Select a country</option>`
                for (let c of data.stock.sort(function(a, b){return a.name-b.name})) {
                    let name = c.name.toUpperCase();
                    
                    let extraContent = ""
                    if (c.stock === 0) extraContent += " disabled"

                    countryMap[name] !== undefined ? name = countryMap[name] : false;
                    optionMenuHTML +=`<option value="${c.name}" class="form-control"${extraContent}>${name} - ${c.stock}</option>`;
                    stockHTML += `${name} - ${c.stock}<br>`
                }
                $('#countryoptions').html(optionMenuHTML);
                $('#stock').html(stockHTML);
            })
        }
    });
    if ($('#check').length) {
        $('#check').click(() => {
            $('#check').attr("disabled", true);
            $('#check').html('<i class="far fa-spinner fa-spin"></i> Loading...')
            $.ajax({
                type: "POST",
                url: `/api/details`,
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify({
                    key: $('#upgradekey').val()
                }),
                success: (data) => {
                    $('#form').hide()
                    $('#results').show()
                    $('#response').click()
                    $('#address').text(data.address)
                    $('#inviteurl').attr('href', data.inviteURL);
                    $('#inviteurl').on('click', () => {window.open($('#inviteurl').attr('href'), '_blank')})
                    let disableConfirmation = false;
                    window.addEventListener('beforeunload', event => {
                        const confirmationText = 'Are you sure?';
                        if (!disableConfirmation) {
                            event.returnValue = confirmationText;
                            return confirmationText;
                        } else {
                            disableConfirmation = false;
                        }
                    });
                    document.addEventListener('click', event => {
                        if (event.target.tagName.toLowerCase() === 'a') {
                            disableConfirmation = true;
                        }
                    });
                    document.addEventListener('submit', event => {
                        disableConfirmation = true;
                    });
                },
                error: function (request, status, error) {
                    let errorMsg = JSON.parse(request.responseText).message;
                    new Noty({
                        type: 'error',
                        layout: 'topRight',
                        theme: 'sunset',
                        timeout: 3000,
                        progressBar: true,
                        text: errorMsg
                    }).show();
                    stock()
                },
                complete: () => {
                    $('#check').attr("disabled", false);
                    $('#check').html(`<span class="btn-inner--text">Upgrade</span><span class="btn-inner--icon"><i class="far fa-long-arrow-alt-right"></i></span>`)
                }
            })
        })
    }
})

$('#signout').click(() => {
    window.open("https://spotify.com/logout", "_blank")
    location.href = "/api/spotify/signout";
});

$('#warranty').click(() => {
    $('#warranty').attr("disabled", true);
    
    $.ajax({
        type: "GET",
        url: `/api/warranty`,
        dataType: 'json',
        contentType: 'application/json',
        success: (data) => {
            $('#form').hide()
            $('#results').show()
            $('#response').click()
            $('#title').text('Successful Warranty Redeem')
            $('#address').text(data.address)
            $('#inviteurl').attr('href', data.inviteURL);
            $('#inviteurl').on('click', () => {window.open($('#inviteurl').attr('href'), '_blank')})
        },
        error: function (request) {
            let errorMsg = JSON.parse(request.responseText).message;
            new Noty({
                type: 'error',
                layout: 'topRight',
                theme: 'sunset',
                timeout: 3000,
                progressBar: true,
                text: errorMsg
            }).show();
        },
        complete: () => {
            $('#warranty').attr("disabled", false);
        }
    })
})