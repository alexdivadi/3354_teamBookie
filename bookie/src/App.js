import './App.css';
import React, { useState, Fragment } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import Search from './pages/search'
import ReadingList from './pages/readinglist'
import 'bootstrap/dist/css/bootstrap.css';

function App() {
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

function createDisplayText() {
        return titleText + " " + authorText
}

function createSchedule() {
    if (titleText === "") {
        alert("There is no book selected!")
    }
    else {
        var alertText = "";
        var newDate = new Date()
        var dailyPageCount = 6

        for (let i = 0; i < readingDaysCount; i++) {
            alertText += (newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' + newDate.getFullYear()
                + ": Page " + ((dailyPageCount * i) + 1) + " to Page "
                + (dailyPageCount * i + dailyPageCount) + '\n';
            newDate.setDate(newDate.getDate() + 1)
        }
        console.log('your mm')

        const userBook = {
            title: titleText,
            author: authorText,
            pageCount: pageCountText,
            readingSchedule: alertText
        }

        axios.post("http://localhost:3001/create", userBook)
        alert(alertText)
    }
}

    function NavBar() {
        return (
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        Bookie
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/reading-list">Reading List</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }

    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path = '/' element={<Search/>} />
                <Route path='/reading-list' element={<ReadingList/>} />
            </Routes>
        </Router>
    );
}

export default App;
