const nodemailer = require("nodemailer");
const cron = require("node-cron");
const Record = require("../../models/Records")

function getDailyNotification(id, date_s, books){
    let locDate = date_s.toString().split(" GMT")[0];
    let textBody = [`<h4><span style="color: #000000;"><em><strong>Dear Student ${id},</strong></em></span></h4>
                    <p style="text-align: left;"><span style="color: #000000;">&emsp;
                    Following are the <em><strong>ISBNs</strong></em> of the books which are due on <strong>${locDate}</strong>:</span>
                    </p><ol>`];
    books.forEach(elem => {
        textBody.push(`<li style="text-align: left;"><span style="color: #000000;">${elem}</span></li>`);
    });
    textBody.push(`</ol><p><em><span style="color: #ff0000;">
                    Note: Please return the due books on time or you will have to pay a 100/- surcharge</span></em></p>
                    <p style="font-size: 90%;"><em><span style="text-decoration: underline;">
                    *This is a system generated E-mail. No response is required*</span></em></p>`
                    );
    return textBody.join("");
}


function deadlineNotifier(recipients){
    let mailOptions = {from: "slem58370@gmail.com", subject: "Approaching Deadline Notification mail"};
    let domain = "@nu.edu.pk";
    let transporter = nodemailer.createTransport( {
        service: 'gmail',
        auth: {
            user: 'slem58370@gmail.com',
            pass: 'hasan_2000_05-1'
        }
    });

    for(const id in recipients){
        mailOptions.to = id + domain;
        let date = Object.keys(recipients[id])[0];
        books = recipients[id][date]
        mailOptions.html = getDailyNotification(id, date, books);
        transporter.sendMail(mailOptions)
            .then( () => {
                console.log("Mails successfully sent to recipients");
            })
            .catch(err => console.log(err))
    }
}

cron.schedule("10 50 12 * * *", () => {
    console.log("starting automated Mail at 7:05");
    Record.aggregate([{$project: {_id: 0,  id: true,books: true}}])
        .then(ans =>{
            let mailTo = {}, today = new Date();;
            ans.forEach(each => {
                each.books.forEach(obj => {
                    let days = Math.floor((obj.rdate - today)/( 1000 * 60 * 60 * 24))
                    if(days < 2){
                        if(!(each.id in mailTo)){
                           mailTo[each.id] = {};
                           mailTo[each.id][obj.rdate] = [obj.isbn]
                        }
                        else{
                            mailTo[each.id][obj.rdate].push(obj.isbn);
                        }
                    }
                });
            });
            deadlineNotifier(mailTo)
        })
        .catch(err => console.log(err));
});


function getManualNotification(bookArray, name, surcharge) {
    let textBody = [`<h4><span style="color: #000000;"><em><strong>Dear ${name},</strong></em></span></h4>
                    <p style="text-align: left;"><span style="color: #000000;">&emsp;
                    Following are your loan details:</span></p>
                    <ul>`]
    bookArray.forEach(item => {
        let bDate = item.bdate.toString().split(" GMT")[0], rDate = item.rdate.toString().split(" GMT")[0]
        textBody.push(`<li style="text-align: left;"><em><span style="color: #000000;">
                            Book ISBN</span><span style="color: #000000;">: </span></em>${item.isbn}
                            <ul>
                            <li style="text-align: left;">Loaned on: ${bDate}</li>
                            <li style="text-align: left;">Due Date : ${rDate}&nbsp; </li>
                            </ul>
                       </li>`);
    });
    textBody.push(`</ul>
                        <p><em><span style="color: #000000;">Current fines Due: RS ${surcharge}/-</span></em></p>
                       <p><span style="color: #ff0000;">
                       Note: </span><span style="color: #ff0000;">A fine of</span><em><span style="color: #ff0000;">
                        <strong>RS 100/- per each</strong></span><span style="color: #ff0000;"><strong> book</strong></span></em> 
                        <span style="color: #ff0000;">will have to be paid in case of a late-return. 
                        Please note that book return will only be accepted if you have no fines due. To pay the fines, visit the librarian</span></p>
                        <p style="font-size: 90%;"><em><span style="text-decoration: underline;">
                        *This reminder E-mail was sent to you be the administrator</span></em><em><span style="text-decoration: underline;">*</span></em></p>
                        <p style="font-size: 90%;"><em><span style="text-decoration: underline;">
                        To contact administrator, E-mail your queries at <span style="color: #000080; text-decoration: underline;">
                        <strong>slem58370@gmail.com</strong></span></span></em></p>`)
    return textBody.join("");
}

function getBorrowNotification(book, bdate, rdate) {
    let locBdate = bdate.split("GMT")[0], locRdate = rdate.split("GMT")[0];
    let textBody = [`<h4><span style="color: #000000;"><em><strong>
                     Dear Student,</strong></em></span></h4>
                    <p style="text-align: left;"><span style="color: #000000;">&emsp;
                    You have Loaned a book from the Library. Following are the details:</span></p>
                    <ul>
                    <li style="text-align: left;"><em>ISBN:  </em>${book.isbn}</li>
                    <li style="text-align: left;"><em>Title: </em>${book.title}</li>
                    <li style="text-align: left;"><em>Subject: </em>${book.subject}</li>
                    </ul>
                    <p><em>Loan Date: </em>${locBdate}</p>
                    <p><em>Return Date: </em>${locRdate}</p>
                    <p><span style="color: #ff0000;">Note: </span><span style="color: #ff0000;">A fine of</span><em><span style="color: #ff0000;"> <strong>RS 100/- per each</strong></span><span style="color: #ff0000;"><strong> book</strong></span></em> <span style="color: #ff0000;">will have to be paid in case of a late-return.</span><em><span style="color: #ff0000;"><br /></span></em></p>
                    <p style="font-size: 90%;"><em><span style="text-decoration: underline;">*This is a system generated E-mail. No response is required*</span></em></p>`
    ];
    return textBody.join("");
}

function mailSend(mailOptions){
    let transporter = nodemailer.createTransport( {
        service: 'gmail',
        auth: {
            user: 'slem58370@gmail.com',
            pass: 'hasan_2000_05-1'
        }
    });
    console.log('did I run??')
    return new Promise( (resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log(err);
                reject(err);
            }
            else{
                console.log(info);
                resolve('resolved')

            }
        })
    })
}

async function manualNotifier(id, bookData, name, surcharge){
    let mailOptions = {from: "slem58370@gmail.com", subject: "Loan Details Notification.", to: id+ "@nu.edu.pk"};
    console.log('reached here');
    mailOptions.html = getManualNotification(bookData, name, surcharge)
    let result = await mailSend(mailOptions)
    console.log(result);
    return result === 'resolved';
}

function borrowNotifier(toID, bookDetails, bdate, rdate) {
    let recipient = toID + "@nu.edu.pk";
    let mailOptions = { from: "slem58370@gmail.com", subject: 'This is a borrow notification', to: recipient};
    mailOptions.html = getBorrowNotification(bookDetails, bdate, rdate);
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "slem58370@gmail.com",
            pass: 'hasan_2000_05-1',
        }
    });
    transporter.sendMail(mailOptions)
        .then( (res) => {
            return true;
        })
        .catch(err => console.log(err));
}

module.exports = {borrow: borrowNotifier, manual: manualNotifier};
// module.exports.manualNotifier = manualNotifier;
