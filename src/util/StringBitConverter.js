export const StringBitConverter = {
    bitToDay: (bitWeek) => {
        let result = "";
        if (bitWeek & 1) {
            return "요일 상관 없음"
        }
        const week = ["월", "화", "수", "목", "금", "토", "일"];
        for (let i = 0; i < bitWeek.length; i++) {
            if (bitWeek[i] === "1") {
                result += week[i];
            }
        }
        return result;
    },
    dayToBit: (day) => {
       let result = "";
       const week = ["월", "화", "수", "목", "금", "토", "일"];
         for (let i = 0; i < week.length; i++) {
                if (day.includes(week[i]))
                    result += "1";
                else result += "0";
         }
         return result;
    },
    hourToBit: (from, to) => {
        let result = "";
        if (!!to && !!from){
            let toHour = to.split(":")[0];
            let fromHour = from.split(":")[0];
            if (toHour === fromHour)
                return "0".repeat(24).replaceAt(toHour+1, "1");
            if (from > to)
                return "1".repeat(24);

            for (let i = 0; i < 24; i++) {
                if (i >= fromHour && i <= toHour)
                    result += "1";
                else result += "0";
            }
            return result;
        } else return "1".repeat(24);
    },
    bitToHour: (bitHour) => {
        let result = "";
        let isStart = false;
        if (bitHour === "1".repeat(24))
            return "시간 상관 없음";
        for (let i = 0; i < bitHour.length; i++) {
            if (!isStart && bitHour[i] === "1") {
                result = i + "시 ~ ";
                isStart = true;
            } else if (isStart && bitHour[i] === "0") {
                result += i + "시";
                isStart = false;
                return result;
            }
        }
        return result;
    }
}

String.prototype.replaceAt = function(index, replacement) {
    if (index >= this.length) {
        return this.valueOf();
    }

    return this.substring(0, index) + replacement + this.substring(index + 1);
}