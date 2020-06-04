const nodemailer = require("nodemailer");
const cron = require("node-cron");
const Record = require("../../models/Records")
const bookNotes = require("./notifications")

const transporter = nodemailer.createTransport( {
    service: 'gmail',
    auth: {
        user: 'slem58370@gmail.com',
        pass: 'hasan_2000_05-1',
    }
});

function mailSend(mailOptions){
    return new Promise( (resolve, reject) => {
        transporter.sendMail(mailOptions, (err, info) => {
            if(err){
                console.log('hehe wrong mail go brrr');;;
                reject(err);
            }
            else{
                console.log(info);
                resolve('resolved')
            }
        })
    })
}

async function deadlineNotifier(recipients){
    console.log(recipients);''
    let mailOptions = {from: "slem58370@gmail.com", subject: "Approaching Deadline Notification mail"};
    let domain = "@nu.edu.pk";

    for(const id in recipients){
        mailOptions.to = id + domain;
        let date = Object.keys(recipients[id])[0];
        let books = recipients[id][date]
        mailOptions.html = bookNotes.dailyBookNote(id, date, books);
        console.log('almost here.');
        try
        {
            await mailSend(mailOptions);
            console.log('chali gay');
        }
        catch (e) {
            console.log('Error. Could not send email to student');
        }
    }
}

async function manualNotifier(id, bookData, name, surcharge){
    let mailOptions = {from: "slem58370@gmail.com", subject: "Loan Details Notification.", to: id+ "@nu.edu.pk"};
    console.log('reached here');
    mailOptions.html = bookNotes.manualBookNote(bookData, name, surcharge);
    try {
        await mailSend(mailOptions)
        return true;
    }
    catch (e) {
        return false;;
    }
}

async function borrowNotifier(toID, bookDetails, bdate, rdate) {
    let recipient = toID + "@nu.edu.pk";
    let mailOptions = { from: "slem58370@gmail.com", subject: 'Book Borrow Notification', to: recipient};
    mailOptions.html = bookNotes.borrowNote(bookDetails, bdate, rdate);
    try {
        let result = await mailSend(mailOptions);
        return true;
    }
    catch (e) {
        console.log(e);
        return false
    }

}

async function returnNotifier(toID, bookDetails){
    let recipient = toID + "@nu.edu.pk",
    mailOptions = { from: "slem58370@gmail.com", subject: 'Book Return Notification', to: recipient},
    date = new Date().toString();
    mailOptions.html = bookNotes.returnNote(bookDetails, date);
    let result;
    try{
        result = await mailSend(mailOptions);
        return true;
    }
    catch (e) {
        return false;
    }

}

async function registerNotifier(toID, password,fname, lname){
    let mailOptions = { from: "slem58370@gmail.com", subject: 'Notification for Registration', to: toID + "@nu.edu.pk"}
    mailOptions.html = bookNotes.registerNote(toID, password,fname, lname);
    try{
        await mailSend(mailOptions)
        return true;
    }
    catch (e) {
        return false;
    }

}


cron.schedule("00 17 13 * * *", () => {
    console.log("starting automated Mail at 13:07");
    Record.aggregate([{$project: {_id: 0,  id: true,books: true}}])
        .then(ans =>{
            let mailTo = {}, today = new Date();
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
                .then(ans => {
                    console.log(ans);
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err));
});


module.exports = {borrow: borrowNotifier, manual: manualNotifier, return: returnNotifier, register: registerNotifier};

