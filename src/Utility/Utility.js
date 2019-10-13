export default class Utility {
    static getNowDateTime() {
        const date = new Date(Date.now());
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return {year, month, day, hours, minutes};
    }

    static getDateBaseNow(year, month, day) {
        const date = new Date(Date.now());
        const RoundDate = this.RoundDate(date.getFullYear() + year, date.getMonth() + 1 + month, date.getDay() + 1 + day);
        return RoundDate.year + '-' + RoundDate.month + '-' + RoundDate.day;
    }

    static getTimeBaseNow(hour, minute) {
        const date = new Date(Date.now());
        const RoundTime = this.RoundTime(date.getHours() + hour, date.getMinutes() + minute);
        return RoundTime.hour + ':' + RoundTime.minute;
    }

    static DateTimeTo2Digit(src) {
        if (src < 10) return '0' + src;
        return src;
    }

    static compareTime(T1, T2) {
        const Time1 = new Date('2019-1-1 ' + T1);
        const Time2 = new Date('2019-1-1 ' + T2);
        return Time1 - Time2;
    }

    static RoundDate(year, month, day) {
        if (day < 1) {
            day = (day + 31) % 31 + 1;
            month--;
        } else if (day > 31) {
            day = day % 31 + 1;
            month++;
        }
        if (month < 1) {
            month = (month + 12) % 12 + 1;
            year--;
        } else if (month > 12) {
            month = month % 12 + 1;
            year++;
        }
        return {year, month, day};
    }

    static RoundTime(hour, minute) {
        if (minute < 15) minute = 0;
        else if (15 <= minute && minute < 45) minute = 30;
        else {
            minute = 0;
            hour += 1;
        }
        return {hour, minute};
    }

    static duration(start, end) {
        let hours = end.split(':')[0] - start.split(':')[0];
        let minutes = end.split(':')[1] - start.split(':')[1];
        if (minutes < 0) {
            hours--;
            minutes = minutes + 60;
        }
        return (hours + minutes / 60).toFixed(1);
    }

    static removeElemntByValue(array, element) {
        return array.filter(ele => ele._id !== element._id);
    }

    static StringToDate(data) { // YYYY-MM-DD
        let ret = [];
        data.split('-').forEach(e => ret.push(parseInt(e)));
        return new Date(ret[0], ret[1] - 1, ret[2], 0, 0, 0);
    }

    static DateToString(data) {
        if (data.split('-').length === 3) return data;
        const date_ = new Date(data);
        return date_.getFullYear() + '-' + (date_.getMonth() + 1) + '-' + (date_.getDay() + 1);
    }

    static LessonInfo(Diary) {
        let info = '[' + Diary.lesson_time.date + '/' + Diary.lesson_time.start + '~' + Diary.lesson_time.end + '] ' + Diary.lesson_type.type + ' / ' + Diary.lesson_about;
        return info;
    }
}