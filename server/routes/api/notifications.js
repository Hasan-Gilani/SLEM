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

function getReturnNotification(book, rdate){
    let rTime = rdate.split("GMT")[0];
    let textBody = [`<h4><span style="color: #000000;"><em><strong>
                     Dear Student,</strong></em></span></h4>
                    <p style="text-align: left;"><span style="color: #000000;">&emsp;
                    You have returned a book to the Library. Following are the details:</span></p>
                    <ul>
                    <li style="text-align: left;"><em>ISBN:  </em>${book.isbn}</li>
                    <li style="text-align: left;"><em>Title: </em>${book.title}</li>
                    <li style="text-align: left;"><em>Subject: </em>${book.subject}</li>
                    </ul>
                    <p><em>Return time: </em>${rTime}</p>
                    <p><span style="color: #ff0000;">Note: </span><span style="color: #ff0000;">A fine of</span><em><span style="color: #ff0000;"> <strong>RS 100/- per each</strong></span><span style="color: #ff0000;"><strong> book</strong></span></em> <span style="color: #ff0000;">will have to be paid in case of a late-return.</span><em><span style="color: #ff0000;"><br /></span></em></p>
                    <p style="font-size: 90%;"><em><span style="text-decoration: underline;">*This is a system generated E-mail. No response is required*</span></em></p>`
    ];
    return textBody.join("");
}

function getRegisterNotification(id, password, fname, lname) {
    let textBody = [`<p><em><strong>Dear ${fname} ${lname},<br /></strong></em></p>
                     <p>&emsp;&emsp; You have been registered in the SLEM system. You can now borrow books and sports good from using the SLEM mobile application. Following are your login credentials:<br /><br /></p>
                     <ul>
                     <li>UserID: ${id}</li>
                     <li>Password: ${password}</li>
                     </ul>
                     <p><span style="text-decoration: underline;"><em><span style="color: #ff0000; text-decoration: underline;">This login information is sensitive. Do not share this information with anyone.<br /></span></em></span></p>
                     <p style="font-size: 90%;"><em><span style="text-decoration: underline;">
                     *This is a system generated E-mail. No response is required*</span></em></p>`]
    return textBody.join("");
    }

function getSpBorrow(sports, bdate, rdate){
    let locBdate = bdate.split("GMT")[0], locRdate = rdate.split("GMT")[0];
    let textBody = [`<h4><span style="color: #000000;"><em><strong>
                     Dear Student,</strong></em></span></h4>
                    <p style="text-align: left;"><span style="color: #000000;">&emsp;
                    You have Loaned a sports good. Following are the details:</span></p>
                    <ul>
                    <li style="text-align: left;"><em>Good No:  </em>${sports.goodID}</li>
                    <li style="text-align: left;"><em>Type: </em>${sports.goodType}</li>
                    </ul>
                    <p><em>Loan Date: </em>${locBdate}</p>
                    <p><em>Return Date: </em>${locRdate}</p>
                    <p><span style="color: #ff0000;">Note: </span><span style="color: #ff0000;">A fine of</span><em><span style="color: #ff0000;"> <strong>RS 100/- per each</strong></span><span style="color: #ff0000;"><strong> good</strong></span></em> <span style="color: #ff0000;">will have to be paid in case of a late-return.</span><em><span style="color: #ff0000;"><br /></span></em></p>
                    <p style="font-size: 90%;"><em><span style="text-decoration: underline;">*This is a system generated E-mail. No response is required*</span></em></p>`
    ];
    return textBody.join("");
}

function getSpReturn(good, rdate){
    let rTime = rdate.split("GMT")[0];
    let textBody = [`<h4><span style="color: #000000;"><em><strong>
                     Dear Student,</strong></em></span></h4>
                    <p style="text-align: left;"><span style="color: #000000;">&emsp;
                    You have returned a sports good . Following are the details:</span></p>
                    <ul>
                    <li style="text-align: left;"><em>Good No:  </em>${good.goodID}</li>
                    <li style="text-align: left;"><em>Good Type: </em>${good.goodType}</li>
                    </ul>
                    <p><em>Return time: </em>${rTime}</p>
                    <p><span style="color: #ff0000;">Note: </span><span style="color: #ff0000;">A fine of</span><em><span style="color: #ff0000;"> <strong>RS 100/- per each</strong></span><span style="color: #ff0000;"><strong> good</strong></span></em> <span style="color: #ff0000;">will have to be paid in case of a late-return.</span><em><span style="color: #ff0000;"><br /></span></em></p>
                    <p style="font-size: 90%;"><em><span style="text-decoration: underline;">*This is a system generated E-mail. No response is required*</span></em></p>`
    ];
    return textBody.join("");
}

function getSpManual(sportArray, name, surcharge){}

function getSpDaily(id, date_s, sports){
    let locDate = date_s.toString().split(" GMT")[0];
    let textBody = [`<h4><span style="color: #000000;"><em><strong>Dear Student ${id},</strong></em></span></h4>
                    <p style="text-align: left;"><span style="color: #000000;">&emsp;
                    Following are the <em><strong>IDs</strong></em> of the good which are due on <strong>${locDate}</strong>:</span>
                    </p><ol>`];
    sports.forEach(elem => {
        textBody.push(`<li style="text-align: left;"><span style="color: #000000;">${elem}</span></li>`);
    });
    textBody.push(`</ol><p><em><span style="color: #ff0000;">
                    Note: Please return the due goods on time or you will have to pay a 100/- surcharge</span></em></p>
                    <p style="font-size: 90%;"><em><span style="text-decoration: underline;">
                    *This is a system generated E-mail. No response is required*</span></em></p>`
    );
    return textBody.join("");
}

module.exports = {
    dailyBookNote: getDailyNotification,
    manualBookNote: getManualNotification,
    borrowNote: getBorrowNotification,
    returnNote: getReturnNotification,
    registerNote: getRegisterNotification,
    sportBorrow: getSpBorrow,
    sportReturn: getSpReturn,
    sportDaily: getSpDaily,
}
