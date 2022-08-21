export const StringBitConverter = {
    toDay: (bitWeek) => {
        let result = "";
        const week = ["월", "화", "수", "목", "금", "토", "일"];
        for (let i = 0; i < bitWeek.length; i++) {
            if (bitWeek[i] === "1") {
                result += week[i];
            }
        }
        return result;
    }
}