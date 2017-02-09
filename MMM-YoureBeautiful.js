/* global Module */

Module.register("MMM-YoureBeautiful", {
    defaults: {
        faceFile: "jamesblunt.mp4",
        faceFileText: "jamesblunt.mpg",
        halloweenFaceFile: "scary.mp4",
        halloweenFaceFileText: "scary.mpg",
        birthdayFaceFile: "happyBirthday.mpg",
        birthdayFaceFileText: "happyBirthday.mpg",
        birthday: {year: 1977, month: 3, day: 6},
        likelyHood: {numerator: 1, denominator: 100}, //1 chance in 100
        interval: 2 * 60 * 1000 //2mins
    },

    start: function () {
        if (this.config.likelyHood.numerator > this.config.likelyHood.denominator) {
            this.config.likelyHood.numerator = this.config.likelyHood.denominator;
        }
    },

    getGetOrdinalHelper: function (n) {
        var s = ["th", "st", "nd", "rd"],
            v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    },

    getDom: function () {
        var self = this;

        var message = this.config.faceFileText;
        var video = this.config.faceFile;
        var now = new Date();
        var year = now.getFullYear();
        var month = (now.getMonth() + 1);
        var day = now.getDate();

        var daytypes = ["normal", "birthday", "halloween"];
        var daytype = daytypes[0];
        if ((month === this.config.birthday.month) && (day === this.config.birthday.day)) {
            daytype = daytypes[1];
        }
        if ((month === 10) && (day === 31)) {
            daytype = daytypes[2];
        }
        if (((month === 10) && (day === 31)) && ((month === this.config.birthday.month) && (day === this.config.birthday.day))) {
            daytype = daytypes[Math.ceil(Math.random() * 2)];
        }

        if (daytype === daytypes[1]) {
            video = this.config.birthdayFaceFile;
            if (this.config.birthdayFaceFileText !== undefined) {
                message = this.config.birthdayFaceFileText;
            } else {
                message = "Happy " + this.getGetOrdinalHelper(year - this.config.birthday.year) + " Birthday";
            }
        }

        if (daytype === daytypes[2]) {
            video = this.config.halloweenFaceFile;
            message = this.config.halloweenFaceFileText;
        }

        var overlay = document.createElement("div");
        overlay.innerHTML += "<div class=\"black_overlay\"></div>";


        var videoDiv = document.createElement("video");
        videoDiv.src = "/modules/" + self.name + "/public/" + video;
        videoDiv.id = "MMM-YoureBeautifulVideoDiv";
        videoDiv.autoplay = false;
        overlay.appendChild(videoDiv);

        var title = document.createElement("div");
        title.classList.add("bold", "large");
        title.innerHTML = message;
        overlay.appendChild(title);


        var i = setInterval(function () {
            if (videoDiv.readyState > 0) {
                self.duration = videoDiv.duration;
                clearInterval(i);
            }
        }, 200);
        return overlay;
    },

    getStyles: function () {
        return [this.file("css/MMM-YoureBeautiful.css")];
    },
    showVid: function () {
        var self = this;
        var video = document.getElementById("MMM-YoureBeautifulVideoDiv");
        if (video.readyState === 0) {
            this.hide();
            return;
        }
        //roll the dice
        video.currentTime = 0;
        this.show();
        video.play();
        setTimeout(function () {
            self.hide();
        }, this.duration);
    },

    notificationReceived: function (notification) {
        if (notification === 'DOM_OBJECTS_CREATED') {
            this.hide();
            if (this.intervalTimer === undefined) {
                var self = this;
                this.intervalTimer = setInterval(self.showVid.bind(this), this.config.interval);
            }
        }
    }

});