import '../App.css';
import React, { useState, Fragment } from 'react';
import { MDBInput } from 'mdbreact';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
import NumericInput from 'react-numeric-input';
import axios from 'axios';



function ReadingList() {
    const [isbnNumber, setIsbnNumber] = useState('');
    const [bookData, setData] = useState({});

    const [titleText, setTitleText] = useState("");
    const [authorText, setAuthorText] = useState("");
    const [pageCountText, setPageCountText] = useState("");

    const [readingStartDate, setReadingStartDate] = useState(new Date());
    const [readingDaysCount, setReadingDaysCount] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const [bookText, setBookText] = useState("");

    var isButtonVisible = false;

    const searchBook=(evt)=> {

        var apiKey = 'AIzaSyAn8Vw2GtgLT_65bD67V09A_QdP5ue2M2U'
        var url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbnNumber + '&key=' + apiKey;

        if (evt.key==='Enter')
        {
            axios.get(url)
                .then((response) => {
                    setData(response.data.items[0])
                });

            if (true) {
                var title = bookData?.volumeInfo?.title;
                var author = bookData?.volumeInfo?.authors;
                var pageCount = bookData?.volumeInfo?.pageCount;

                setTitleText("'" + title + "'");
                setAuthorText(" by " + author)
                setPageCount(pageCount);

                if (pageCount !== undefined) {
                    setPageCountText("Pages: " + pageCount)
                }
                createDisplayText()

                isButtonVisible = true;
            }
        }
    }

    function createDisplayText(titleText, authorText) {
        return titleText + " " + authorText
    }

    function createSchedule() {
        if (titleText === "") {
            alert("There is no book selected!")
        }
        else {
            var alertText = "";
            var newDate = new Date()
            var dailyPageCount = pageCount / readingDaysCount
            let days = new Array()

            for (let i = 0; i < readingDaysCount; i++) {
                alertText += (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear()
                    + ": Page " + (dailyPageCount * i) + " to Page "
                    + (dailyPageCount * i + dailyPageCount) + '\n';
                newDate.setDate(newDate.getDate() + 1)
                console.log('inside')

                let day = [i + 1, (dailyPageCount * i + 1), (dailyPageCount * (i) + dailyPageCount)]
                days.push(day)
            }
            console.log(days)
            console.log('hello')

            const userBook = {
                title: titleText,
                author: authorText,
                pageCount: pageCountText,
                readingSchedule: alertText
            }

            //axios.post("http://localhost:3001/create", userBook)
            alert(alertText)
        }
    }

    return (
        <>
            <div className='header'>

                <h1>Bookie</h1>
                <MDBInput className='search' hint="Search" type="text" containerClass="mt-0"
                          value={isbnNumber}
                          onChange={e=>setIsbnNumber(e.target.value)}
                          onKeyPress={searchBook}
                />

                <div className='date-picker-box'>
                    <h6>Select Date and Number of Reading Days:</h6>
                    <DatePicker
                        className = 'date-picker'
                        clearIcon = "Clear"
                        onChange = {setReadingStartDate}
                        value = {readingStartDate}
                    />
                    <NumericInput
                        onChange = {setReadingDaysCount}
                        value = {readingDaysCount}
                    />
                </div>


                <h4 className='title-text'> {createDisplayText(titleText, authorText)}</h4>
                <h6 className='page-count-text'>{pageCountText}</h6>
                <Button onClick={createSchedule}>Create Reading Schedule</Button>
            </div>
        </>
    );
}

export default ReadingList;
