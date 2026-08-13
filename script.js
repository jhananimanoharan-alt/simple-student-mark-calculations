"use strict";

document.addEventListener("DOMContentLoaded", () => {

    // ==============================
    // GET ELEMENTS
    // ==============================

    const studentName = document.getElementById("studentName");
    const rollNumber = document.getElementById("rollNumber");
    const studentClass = document.getElementById("studentClass");
    const examName = document.getElementById("examName");

    const markInputs = document.querySelectorAll(".mark");

    const calculateBtn = document.getElementById("calculate");
    const resetBtn = document.getElementById("reset");

    const errorBox = document.getElementById("error");

    const emptyBox = document.getElementById("empty");
    const resultBox = document.getElementById("result");

    const statusBox = document.getElementById("status");

    const resultName = document.getElementById("resultName");
    const resultDetails = document.getElementById("resultDetails");
    const avatar = document.getElementById("avatar");

    const percentage = document.getElementById("percentage");
    const percentage2 = document.getElementById("percentage2");

    const total = document.getElementById("total");
    const average = document.getElementById("average");

    const grade = document.getElementById("grade");
    const message = document.getElementById("message");

    const scoreCircle = document.getElementById("scoreCircle");
    const analysis = document.getElementById("analysis");

    const downloadBtn = document.getElementById("download");
    const printBtn = document.getElementById("print");

    const themeToggle = document.getElementById("themeToggle");

    const historyList = document.getElementById("historyList");
    const clearHistoryBtn = document.getElementById("clearHistory");


    // ==============================
    // CHECK ELEMENTS
    // ==============================

    if (!calculateBtn) {
        console.error("Calculate button not found.");
        return;
    }


    // ==============================
    // CALCULATE BUTTON
    // ==============================

    calculateBtn.addEventListener("click", calculateResult);


    function calculateResult() {

        clearError();

        let valid = true;


        // ------------------------------
        // STUDENT NAME
        // ------------------------------

        if (studentName.value.trim() === "") {

            showError(
                studentName,
                "Please enter student name."
            );

            valid = false;
        }


        // ------------------------------
        // ROLL NUMBER
        // ------------------------------

        if (rollNumber.value.trim() === "") {

            showError(
                rollNumber,
                "Please enter roll number."
            );

            valid = false;
        }


        // ------------------------------
        // CLASS
        // ------------------------------

        if (studentClass.value.trim() === "") {

            showError(
                studentClass,
                "Please enter class."
            );

            valid = false;
        }


        // ------------------------------
        // CHECK MARKS
        // ------------------------------

        const subjects = [];

        markInputs.forEach(input => {

            const value = input.value.trim();

            const mark = Number(value);


            if (
                value === "" ||
                isNaN(mark) ||
                mark < 0 ||
                mark > 100
            ) {

                input.classList.add("invalid");

                valid = false;

            } else {

                subjects.push({
                    name: input.dataset.subject,
                    mark: mark
                });

            }

        });


        if (!valid) {

            errorBox.textContent =
                "Please enter valid details and marks between 0 and 100.";

            return;
        }


        // ==============================
        // CALCULATION
        // ==============================

        const numberOfSubjects =
            subjects.length;

        const maximumMarks =
            numberOfSubjects * 100;


        let totalMarks = 0;


        subjects.forEach(subject => {

            totalMarks += subject.mark;

        });


        const avg =
            totalMarks / numberOfSubjects;


        const percentageValue =
            (totalMarks / maximumMarks) * 100;


        // ==============================
        // PASS / FAIL
        // ==============================

        const passed =
            subjects.every(
                subject => subject.mark >= 35
            );


        // ==============================
        // GRADE
        // ==============================

        let finalGrade;


        if (percentageValue >= 90) {

            finalGrade = "A+";

        } else if (percentageValue >= 80) {

            finalGrade = "A";

        } else if (percentageValue >= 70) {

            finalGrade = "B";

        } else if (percentageValue >= 60) {

            finalGrade = "C";

        } else if (percentageValue >= 50) {

            finalGrade = "D";

        } else {

            finalGrade = "F";

        }


        // ==============================
        // PERFORMANCE MESSAGE
        // ==============================

        let performanceMessage;


        if (!passed) {

            performanceMessage =
                "Some subjects need improvement.";

        } else if (percentageValue >= 90) {

            performanceMessage =
                "Outstanding Performance! 🚀";

        } else if (percentageValue >= 80) {

            performanceMessage =
                "Excellent Performance! 🌟";

        } else if (percentageValue >= 70) {

            performanceMessage =
                "Very Good Performance! ✨";

        } else if (percentageValue >= 60) {

            performanceMessage =
                "Good Performance! 👍";

        } else {

            performanceMessage =
                "Keep improving! 💪";

        }


        // ==============================
        // DISPLAY STUDENT DETAILS
        // ==============================

        resultName.textContent =
            studentName.value.trim();


        let details =
            rollNumber.value.trim()
            + " • "
            + studentClass.value.trim();


        if (examName.value.trim() !== "") {

            details +=
                " • "
                + examName.value.trim();

        }


        resultDetails.textContent =
            details;


        avatar.textContent =
            studentName.value
                .trim()
                .charAt(0)
                .toUpperCase();


        // ==============================
        // DISPLAY TOTAL
        // ==============================

        total.textContent =
            `${totalMarks}/${maximumMarks}`;


        // ==============================
        // DISPLAY AVERAGE
        // ==============================

        average.textContent =
            avg.toFixed(2);


        // ==============================
        // DISPLAY PERCENTAGE
        // ==============================

        const formattedPercentage =
            percentageValue.toFixed(1);


        percentage.textContent =
            `${formattedPercentage}%`;


        percentage2.textContent =
            `${formattedPercentage}%`;


        // ==============================
        // DISPLAY GRADE
        // ==============================

        grade.textContent =
            finalGrade;


        message.textContent =
            performanceMessage;


        // ==============================
        // PASS / FAIL STATUS
        // ==============================

        if (passed) {

            statusBox.textContent =
                "✓ PASSED";

            statusBox.className =
                "status pass";

        } else {

            statusBox.textContent =
                "✕ FAILED";

            statusBox.className =
                "status fail";

        }


        // ==============================
        // SCORE CIRCLE
        // ==============================

        const degrees =
            percentageValue * 3.6;


        scoreCircle.style.background =
            `conic-gradient(
                #8b5cf6 0deg,
                #06b6d4 ${degrees}deg,
                rgba(255,255,255,0.08) ${degrees}deg
            )`;


        // ==============================
        // SUBJECT ANALYSIS
        // ==============================

        analysis.innerHTML = "";


        subjects.forEach((subject, index) => {

            const item =
                document.createElement("div");

            item.className =
                "analysis-item";


            const info =
                document.createElement("div");

            info.className =
                "analysis-info";


            const subjectName =
                document.createElement("span");

            subjectName.textContent =
                subject.name;


            const subjectMark =
                document.createElement("span");

            subjectMark.textContent =
                `${subject.mark}/100`;


            info.appendChild(subjectName);

            info.appendChild(subjectMark);


            const progress =
                document.createElement("div");

            progress.className =
                "progress";


            const bar =
                document.createElement("div");

            bar.className =
                "progress-bar";


            progress.appendChild(bar);

            item.appendChild(info);

            item.appendChild(progress);

            analysis.appendChild(item);


            // Animate progress bar
            setTimeout(() => {

                bar.style.width =
                    `${subject.mark}%`;

            }, 100 + (index * 100));

        });


        // ==============================
        // SHOW RESULT
        // ==============================

        emptyBox.style.display =
            "none";


        resultBox.classList.add("show");


        // ==============================
        // SAVE RESULT
        // ==============================

        saveResult({
            name: studentName.value.trim(),
            roll: rollNumber.value.trim(),
            className: studentClass.value.trim(),
            exam: examName.value.trim(),
            total: totalMarks,
            maximum: maximumMarks,
            average: avg,
            percentage: percentageValue,
            grade: finalGrade,
            passed: passed,
            date: new Date().toISOString()
        });


        // ==============================
        // SCROLL TO RESULT
        // ==============================

        setTimeout(() => {

            resultBox.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
            });

        }, 150);

    }


    // ==============================
    // ERROR FUNCTIONS
    // ==============================

    function showError(element, text) {

        element.classList.add("invalid");

        if (errorBox.textContent === "") {

            errorBox.textContent = text;

        }

    }


    function clearError() {

        errorBox.textContent = "";

        document
            .querySelectorAll(".invalid")
            .forEach(element => {

                element.classList.remove(
                    "invalid"
                );

            });

    }


    // ==============================
    // RESET
    // ==============================

    resetBtn.addEventListener(
        "click",
        resetCalculator
    );


    function resetCalculator() {

        studentName.value = "";
        rollNumber.value = "";
        studentClass.value = "";
        examName.value = "";


        markInputs.forEach(input => {

            input.value = "";

            input.classList.remove(
                "invalid"
            );

        });


        errorBox.textContent = "";


        resultBox.classList.remove(
            "show"
        );


        emptyBox.style.display =
            "flex";


        statusBox.textContent =
            "Waiting";

        statusBox.className =
            "status";


        percentage.textContent =
            "0%";

        percentage2.textContent =
            "0%";

        total.textContent =
            "0/500";

        average.textContent =
            "0";

        grade.textContent =
            "-";

        message.textContent =
            "—";


        analysis.innerHTML = "";


        scoreCircle.style.background =
            `conic-gradient(
                #8b5cf6 0deg,
                #06b6d4 0deg,
                rgba(255,255,255,0.08) 0deg
            )`;

    }


    // ==============================
    // LOCAL STORAGE
    // ==============================

    const HISTORY_KEY =
        "marknova_results";


    function saveResult(data) {

        let history =
            JSON.parse(
                localStorage.getItem(
                    HISTORY_KEY
                )
            ) || [];


        history.unshift(data);


        // Keep maximum 20 results
        history =
            history.slice(0, 20);


        localStorage.setItem(
            HISTORY_KEY,
            JSON.stringify(history)
        );


        displayHistory();

    }


    // ==============================
    // DISPLAY HISTORY
    // ==============================

    function displayHistory() {

        let history =
            JSON.parse(
                localStorage.getItem(
                    HISTORY_KEY
                )
            ) || [];


        if (history.length === 0) {

            historyList.innerHTML = `
                <div class="no-history">
                    No results saved yet.
                </div>
            `;

            return;
        }


        historyList.innerHTML = "";


        history.forEach((item, index) => {

            const historyItem =
                document.createElement("div");


            historyItem.className =
                "history-item";


            const information =
                document.createElement("div");


            const name =
                document.createElement("div");

            name.className =
                "history-name";

            name.textContent =
                item.name;


            const date =
                document.createElement("div");

            date.className =
                "history-date";

            date.textContent =
                formatDate(item.date);


            information.appendChild(name);

            information.appendChild(date);


            const gradeElement =
                document.createElement("div");

            gradeElement.className =
                "history-grade";

            gradeElement.textContent =
                item.grade;


            const deleteButton =
                document.createElement("button");

            deleteButton.className =
                "delete-history";

            deleteButton.textContent =
                "×";

            deleteButton.dataset.index =
                index;


            historyItem.appendChild(
                information
            );

            historyItem.appendChild(
                gradeElement
            );

            historyItem.appendChild(
                deleteButton
            );


            historyList.appendChild(
                historyItem
            );

        });

    }


    // ==============================
    // DELETE HISTORY
    // ==============================

    historyList.addEventListener(
        "click",
        event => {

            if (
                !event.target.classList.contains(
                    "delete-history"
                )
            ) {
                return;
            }


            const index =
                Number(
                    event.target.dataset.index
                );


            let history =
                JSON.parse(
                    localStorage.getItem(
                        HISTORY_KEY
                    )
                ) || [];


            history.splice(index, 1);


            localStorage.setItem(
                HISTORY_KEY,
                JSON.stringify(history)
            );


            displayHistory();

        }
    );


    // ==============================
    // CLEAR HISTORY
    // ==============================

    clearHistoryBtn.addEventListener(
        "click",
        () => {

            const history =
                JSON.parse(
                    localStorage.getItem(
                        HISTORY_KEY
                    )
                ) || [];


            if (history.length === 0) {

                return;

            }


            const confirmed =
                confirm(
                    "Are you sure you want to delete all results?"
                );


            if (!confirmed) {

                return;

            }


            localStorage.removeItem(
                HISTORY_KEY
            );


            displayHistory();

        }
    );


    // ==============================
    // DOWNLOAD RESULT
    // ==============================

    downloadBtn.addEventListener(
        "click",
        downloadResult
    );


    function downloadResult() {

        if (
            !resultBox.classList.contains(
                "show"
            )
        ) {

            alert(
                "Please calculate the result first."
            );

            return;

        }


        let text = "";

        text +=
            "====================================\n";

        text +=
            "          MARKNOVA RESULT\n";

        text +=
            "====================================\n\n";

        text +=
            `Student Name : ${resultName.textContent}\n`;

        text +=
            `Details      : ${resultDetails.textContent}\n\n`;

        text +=
            `Total        : ${total.textContent}\n`;

        text +=
            `Average      : ${average.textContent}\n`;

        text +=
            `Percentage   : ${percentage2.textContent}\n`;

        text +=
            `Grade        : ${grade.textContent}\n`;

        text +=
            `Performance  : ${message.textContent}\n\n`;

        text +=
            "====================================\n";

        text +=
            "Generated by MarkNova\n";


        const blob =
            new Blob(
                [text],
                {
                    type: "text/plain"
                }
            );


        const url =
            URL.createObjectURL(blob);


        const link =
            document.createElement("a");


        link.href = url;

        link.download =
            `${resultName.textContent}_Result.txt`;


        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);


        URL.revokeObjectURL(url);

    }


    // ==============================
    // PRINT
    // ==============================

    printBtn.addEventListener(
        "click",
        () => {

            if (
                !resultBox.classList.contains(
                    "show"
                )
            ) {

                alert(
                    "Please calculate the result first."
                );

                return;

            }


            window.print();

        }
    );


    // ==============================
    // THEME
    // ==============================

    themeToggle.addEventListener(
        "click",
        () => {

            document.body.classList.toggle(
                "light"
            );


            const isLight =
                document.body.classList.contains(
                    "light"
                );


            localStorage.setItem(
                "marknova_theme",
                isLight
                    ? "light"
                    : "dark"
            );


            themeToggle.textContent =
                isLight
                    ? "🌙"
                    : "☀️";

        }
    );


    // ==============================
    // LOAD THEME
    // ==============================

    const savedTheme =
        localStorage.getItem(
            "marknova_theme"
        );


    if (savedTheme === "light") {

        document.body.classList.add(
            "light"
        );

        themeToggle.textContent =
            "🌙";

    }


    // ==============================
    // FORMAT DATE
    // ==============================

    function formatDate(date) {

        return new Date(date)
            .toLocaleString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

    }


    // ==============================
    // KEYBOARD SHORTCUT
    // ==============================

    document.addEventListener(
        "keydown",
        event => {

            // Ctrl + Enter
            if (
                event.ctrlKey &&
                event.key === "Enter"
            ) {

                calculateResult();

            }


            // Escape
            if (
                event.key === "Escape"
            ) {

                resetCalculator();

            }

        }
    );


    // ==============================
    // INITIALIZE
    // ==============================

    displayHistory();

});