var text = "";
var accountsPageNumber = 0;
var logsPageNumber = 0;
var keysPageNumber = 0;
var chosenCountry = "";

function fallbackCopyTextToClipboard(t = text) {

    var textArea = document.createElement("textarea");
    textArea.value = t;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        if (msg) {
            swal.close();
            new Noty({
                type: 'success',
                layout: 'topRight',
                theme: 'sunset',
                timeout: 3000,
                progressBar: true,
                text: 'Copied to clipboard'
            }).show();
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function copy(t = text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(t);
        return;
    }
    navigator.clipboard.writeText(t).then(function () {
        if (swal.getState().isOpen) swal.close();
        new Noty({
            type: 'success',
            layout: 'topRight',
            theme: 'sunset',
            timeout: 3000,
            progressBar: true,
            text: 'Copied to clipboard'
        }).show();
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}


function download(t = text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(t));
    element.setAttribute('download', "new-keys.txt");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    swal.close();
}

function radio(e) {
    chosenCountry = e.value;
    accountsPage()
}

function deleteAcc(username, password, country) {
    $.ajax({
        type: "DELETE",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            username: username,
            password: password,
            country: country
        }),
        url: `/api/admin/accounts/remove`,
        complete: (data) => {
            location.reload()
        }
    })
}

function accountsPage(change = 0) {
    accountsPageNumber = accountsPageNumber + change;
    $('#pageNumber').text(accountsPageNumber + 1)
    $('#countryid').text(chosenCountry.toUpperCase())
    $.ajax({
        type: "GET",
        url: `/api/admin/accounts?skip=${accountsPageNumber * 50}&country=${encodeURIComponent(chosenCountry)}`,
        success: (data) => {
            let newHtml = ``;
            let count = 0;
            if (accountsPageNumber == 0)
                $('#goBack').addClass('disabled')
            else
                $('#goBack').removeClass('disabled')

            if (accountsPageNumber * 50 > data.total)
                $('#goForward').addClass('disabled')
            else
                $('#goForward').removeClass('disabled')
            for (let key of data.accounts.find(c => c.name.toLowerCase() === chosenCountry.toLowerCase())
                    .accounts) {
                if (key.dead !== true && key.used !== true) {
                    count++
                    newHtml += `<tr><td scope="row" class="name"><i class="fas fa-user-circle" style="padding-left: 10px;"></i>
                        </td><td>${count + accountsPageNumber * 50}</td><td scope="row" class="name"><span class="media-body">
                        <span class="mb-0 text-sm">${key.username}</span></span></td><td scope="row" class="name"><span class="media-body">
                        <span class="mb-0 text-sm">${key.password}</span></span></td><td>
                        <button class="btn btn-icon btn-3 btn-outline-success" type="button" onclick=copy('${key.username}:${key.password}')>
                        <span class="btn-inner--icon"><i class="fas fa-copy"></i></span><span class="btn-inner--text">
                        Copy</span></button></td><td>
                        <button class="btn btn-icon btn-3 btn-outline-danger" type="button" onclick="deleteAcc('${key.username}', '${key.password}', '${chosenCountry}')">
                        <span class="btn-inner--icon"><i class="fas fa-trash-alt"></i></span><span class="btn-inner--text">
                        Delete</span></button></td></tr>`
                }
            }
            $('#tableid').html(newHtml)
        }
    })
}

$(document).ready(() => {
    $.ajax({
        type: "GET",
        url: "/api/stock",
        success: (data) => {
            $('#totalcountries').text(data.total)
            $('#totalaccounts').text(data.stock.map(x => x.stock).reduce((a, b) => a + b, 0))
            let newHtml = "";
            let newHtml2 = '<option selected disabled class="form-control">Select a country</option>';
            for (let c of data.stock) {
                newHtml += `<div class="custom-control custom-radio mb-3" style="display: inline-flex; margin: 10px">
                        <input onchange="radio(this)" name="country" class="custom-control-input" id="${c.name}" type="radio" value="${c.name}">
                        <label class="custom-control-label" for="${c.name}">${c.name.toUpperCase()}</label></div>`
                newHtml2 += `<option value="${c.name}" class="form-control">${c.name.toUpperCase()}</option>`
            }
            $('#alloptions').html(newHtml)
            $('#countryoptions').html(newHtml2)
            $('#countryoptions2').html(newHtml2)
        }
    });
    $.ajax({
        type: "GET",
        url: `/api/admin/keys`,
        success: (data) => {
            $('#totalkeys').text(data.total)
        }
    })
    if (location.pathname.includes('keys')) keysPage(0)

    $('#removeaccount').click(() => {
        let country = $('#countryoptions2').val();
        if (country === null) return new Noty({
            type: 'warning',
            layout: 'topRight',
            theme: 'sunset',
            timeout: 3000,
            progressBar: true,
            text: 'Select a country'
        }).show();
        $.ajax({
            type: "DELETE",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                country: country
            }),
            url: "/api/admin/countries/remove",
            complete: (data) => {
                new Noty({
                    type: 'success',
                    layout: 'topRight',
                    theme: 'sunset',
                    timeout: 3000,
                    progressBar: true,
                    text: 'Success'
                }).show();
                setTimeout(() => {
                    location.reload()
                }, 3000)
            }
        })
    })

    $('#addaccount').click(() => {
        let country = $('#countryoptions').val();
        if (country === null) return new Noty({
            type: 'warning',
            layout: 'topRight',
            theme: 'sunset',
            timeout: 3000,
            progressBar: true,
            text: 'Select a country'
        }).show();
        let accounts = $('#accountlist').val().split(/\r?\n/g);
        let finalAccs = [];
        for (let a of accounts) {
            if (a !== "" && a !== " " && a.split(':')[1]) {

                finalAccs.push({
                    username: a.split(':')[0],
                    password: a.split(':')[1]
                })
            }
        }
        $.ajax({
            type: "POST",
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                country: country,
                accounts: finalAccs
            }),
            url: "/api/admin/accounts/add",
            complete: (data) => {
                swal({
                    icon: "success",
                    title: 'Success'
                }).then(a => {
                    location.reload();
                })
            }
        })

    })

    $('#addcountry').click(() => {
        swal({
                text: 'What\'s the country code? (not the country name)',
                content: "input",
                button: {
                    text: "Generate",
                    closeModal: false,
                },
            })
            .then(a => {
                if (!a) throw null;

                $.ajax({
                    type: "POST",
                    dataType: 'json',
                    contentType: 'application/json',
                    data: JSON.stringify({
                        country: a.toUpperCase()
                    }),
                    url: "/api/admin/countries/add",
                    complete: (data) => {
                        var span = document.createElement("span");
                        span.innerHTML =
                            `Added country.`
                        swal({
                            icon: "success",
                            title: 'Success',
                            content: span
                        }).then(a => {
                            location.reload();
                        })
                    }
                });
            })
            .catch(err => {
                if (err) {
                    swal("Error", "The request failed", "error");
                } else {
                    swal.stopLoading();
                    swal.close();
                }
            });
    })
    $('#purgekeys').click(() => {
        swal({
                text: 'Are you sure you want to purge all keys?',
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
            .then(willDelete => {
                if (willDelete) {
                    $.ajax({
                        type: "DELETE",
                        dataType: 'json',
                        contentType: 'application/json',
                        url: "/api/admin/keys/purge",
                        complete: (data) => {
                            swal({
                                icon: "success",
                                title: 'Purged all keys'
                            }).then(a => {
                                location.reload();
                            })
                        }
                    })
                }
            })
    })

    $('#generatekeys').click(() => {
        swal({
                text: 'How many keys do you want to generate?',
                content: "input",
                button: {
                    text: "Next",
                    closeModal: false,
                },
            })
            .then(a => {
                if (!a) throw null;
                if (!Number(a)) {
                    let span = document.createElement("span");
                    span.innerText = 'Your input wasn\'t a number'
                    return swal({
                        icon: "error",
                        title: 'Error',
                        content: span
                    })
                }
                if (Number(a) < 0) {
                    let span = document.createElement("span");
                    span.innerText = 'Your input needs to be more than 0'
                    return swal({
                        icon: "error",
                        title: 'Error',
                        content: span
                    })
                }

                swal({
                        text: 'Do you want the keys to be warranty? (yes/no)',
                        content: "input",
                        button: {
                            text: "Generate",
                            closeModal: false,
                        },
                    })
                    .then(a2 => {
                        if (!a2) throw null;
                        let yes = ["yes", "y", "true"];
                        let no = ["no", "n", "false"];
                        let w;
                        if (yes.includes(a2.toLowerCase())) w = true;
                        else if (no.includes(a2.toLowerCase())) w = false;
                        else {
                            let span = document.createElement("span");
                            span.innerText = 'You didn\'t enter yes or no.'
                            return swal({
                                icon: "error",
                                title: 'Error',
                                content: span
                            })
                        }
                        $.ajax({
                            type: "POST",
                            dataType: 'json',
                            contentType: 'application/json',
                            data: JSON.stringify({
                                amount: a,
                                warranty: w
                            }),
                            url: "/api/admin/keys/generate",
                            success: (data) => {
                                var span = document.createElement("span");
                                text = data.keys.map(k => k.value).join('\n');
                                span.innerHTML =
                                    `<a href="javascript:download()">Download</a> | <a href="javascript:copy()">Copy</a>`
                                swal({
                                    icon: "success",
                                    title: 'Success',
                                    content: span
                                }).then(a => {
                                    location.reload();
                                });
                            }
                        })
                        .catch(err => {
                            if (err) {
                                swal("Error", "The request failed", "error");
                            } else {
                                swal.stopLoading();
                                swal.close();
                            }
                        });
                    });
            })
    });

    $('#contactbutton').click(() => {
        $.ajax({
            type: "PATCH",
            url: `/api/admin/settings/update`,

            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                "CONTACT_LINK": $('#contactlink').val()
            }),
            complete: (data) => {
                new Noty({
                    type: 'success',
                    layout: 'topRight',
                    theme: 'sunset',
                    timeout: 3000,
                    progressBar: true,
                    text: 'Changed contact link'
                }).show();
            }
        })
    })

    $('#buybutton').click(() => {
        $.ajax({
            type: "PATCH",
            url: `/api/admin/settings/update`,

            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                BUY_LINK: $('#link').val()
            }),
            complete: (data) => {
                new Noty({
                    type: 'success',
                    layout: 'topRight',
                    theme: 'sunset',
                    timeout: 3000,
                    progressBar: true,
                    text: 'Changed buy link'
                }).show();
            }
        })
    })

    $('#maxreplacements').click(() => {
        let v = $('#maxreplacementsvalue').val()

        if (isNaN(v)) return new Noty({
            type: 'error',
            layout: 'topRight',
            theme: 'sunset',
            timeout: 3000,
            progressBar: true,
            text: 'Value not a number'
        }).show();
        $.ajax({
            type: "PATCH",
            url: `/api/admin/settings/update`,

            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({
                MAX_REPLACEMENTS: v
            }),
            complete: (data) => {
                new Noty({
                    type: 'success',
                    layout: 'topRight',
                    theme: 'sunset',
                    timeout: 3000,
                    progressBar: true,
                    text: 'Changed max replacements value'
                }).show();
            }
        })
    })
})

window.onscroll = function () {
    scrollFunction()
};
scrollUp = document.getElementById("scrollUp");

function scrollFunction() {
    if (!scrollUp) return;
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollUp.style.display = "block";
    } else {
        scrollUp.style.display = "none";
    }
}

function up() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function deleteKey(key) {
    $.ajax({
        type: "POST",
        url: `/api/admin/keys/remove`,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            key: key
        }),
        complete: (data) => {
            location.reload()
        }
    })
}

function deleteLog(key, upgradedAt) {
    $.ajax({
        type: "DELETE",
        url: `/api/admin/logs/remove`,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            key: key,
            upgradedAt: upgradedAt
        }),
        complete: (data) => {
            location.reload();
        }
    })
}

function revokeKey(key) {
    console.log("fire?")
    $.ajax({
        type: "POST",
        url: `/api/admin/keys/revoke`,
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({
            key: key
        }),
        complete: (data) => {
            data = data.responseJSON;
            swal({
                icon: "warning",
                title: data.title,
                text: `${data.content}`
            })
        }
    })
}

function download(t = text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(t));
    element.setAttribute('download', "new-keys.txt");
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    swal.close();
}

function fallbackCopyTextToClipboard(t = text) {

    var textArea = document.createElement("textarea");
    textArea.value = t;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        if (msg) {
            swal.close();
            new Noty({
                type: 'success',
                layout: 'topRight',
                theme: 'sunset',
                timeout: 3000,
                progressBar: true,
                text: 'Copied to clipboard'
            }).show();
        }
    } catch (err) {
        console.error('Fallback: Oops, unable to copy', err);
    }

    document.body.removeChild(textArea);
}

function copy(t = text) {
    if (!navigator.clipboard) {
        fallbackCopyTextToClipboard(t);
        return;
    }
    navigator.clipboard.writeText(t).then(function () {
        if (swal.getState().isOpen) swal.close();
        new Noty({
            type: 'success',
            layout: 'topRight',
            theme: 'sunset',
            timeout: 3000,
            progressBar: true,
            text: 'Copied to clipboard'
        }).show();
    }, function (err) {
        console.error('Async: Could not copy text: ', err);
    });
}

function keysPage(change = 0) {
    keysPageNumber = keysPageNumber + change;
    $('#pageNumber').text(keysPageNumber + 1)
    $.ajax({
        type: "GET",
        url: `/api/admin/keys?skip=${keysPageNumber * 50}`,
        success: (data) => {
            $('#totalkeys').text(data.total)
            let newHtml = ``;
            let count = 0;
            if (keysPageNumber == 0)
                $('#goBack').addClass('disabled')
            else
                $('#goBack').removeClass('disabled')

            if (keysPageNumber * 50 > data.total)
                $('#goForward').addClass('disabled')
            else
                $('#goForward').removeClass('disabled')
            for (let key of data.keys) {
                count++
                newHtml += `<tr><td scope="row" class="name"><i class="ni ni-key-25" style="padding-left: 10px;"></i>
                </td><td>${count + keysPageNumber * 50}</td><td scope="row" class="name"><span class="media-body">
                <span class="mb-0 text-sm">${key.value}</span></span></td><td>
                <button class="btn btn-icon btn-3 btn-outline-success" type="button" onclick=copy('${key.value}')>
                <span class="btn-inner--icon"><i class="fas fa-copy"></i></span><span class="btn-inner--text">
                Copy</span></button></td><td>
                <button class="btn btn-icon btn-3 btn-outline-danger" type="button" onclick=deleteKey('${key.value}')>
                <span class="btn-inner--icon"><i class="fas fa-trash-alt"></i></span><span class="btn-inner--text">
                Delete</span></button></td></tr>`
            }
            $('#tableid').html(newHtml)
        }
    })
}

function logsPage(change = 0) {
    logsPageNumber = logsPageNumber + change;
    $('#pageNumber').text(logsPageNumber + 1)
    $.ajax({
        type: "GET",
        url: `/api/admin/logs`,
        success: (data) => {
            $('#totalkeys').text(data.total)
            let newHtml = ``;
            let count = 0;
            if (logsPageNumber == 0)
                $('#goBack').addClass('disabled')
            else
                $('#goBack').removeClass('disabled')

            if (logsPageNumber * 50 > data.total)
                $('#goForward').addClass('disabled')
            else
                $('#goForward').removeClass('disabled')
            for (let key of data.logs) {
                console.log(key)
                count++
                newHtml += `<tr><td scope="row" class="name"><i class="ni ni-key-25" style="padding-left: 10px;"></i>
                </td><td>${count + logsPageNumber * 50}</td><td scope="row" class="name"><span class="media-body">
                <span class="mb-0 text-sm">${key.key}</span></span></td><td>
                <span class="mb-0 text-sm">${key.email}</span></span></td><td>
                <span class="mb-0 text-sm">${key.country}</span></span></td><td>
                <span class="media-body"><span class="mb-0 text-sm">${key.familyAccount.username}:${key.familyAccount.password}</span></span></td><td>
                <span class="media-body"><span class="mb-0 text-sm">${key.familyAccount.address}</span></span></td><td>
                <span class="media-body"><span class="mb-0 text-sm"><a href="${key.familyAccount.inviteURL}">Link</a></span></span></td><td>
                <span class="media-body"><span class="mb-0 text-sm">${key.ip}</span></span></td><td>
                ${key.upgradedAt ? `<span class="media-body"><span class="mb-0 text-sm">${new Date(key.upgradedAt)}</span></span></td>` : `<span class="media-body"><span class="mb-0 text-sm">Not recorded</span></span></td>`}
                <td><button class="btn btn-icon btn-3 btn-outline-warning" type="button" onclick=revokeKey('${key.key}')>
                <span class="btn-inner--icon"><i class="fas fa-trash-alt"></i></span><span class="btn-inner--text">
                (Un)revoke</span></button></td>
                <td><button class="btn btn-icon btn-3 btn-outline-danger" type="button" onclick=deleteLog("${key.key}","${key.upgradedAt}")>
                <span class="btn-inner--icon"><i class="fas fa-trash-alt"></i></span><span class="btn-inner--text">
                Delete Log</span></button></td></tr>`
            }
            $('#tableid').html(newHtml)
        }
    })
}