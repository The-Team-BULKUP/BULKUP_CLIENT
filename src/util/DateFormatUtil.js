export const DateFormatUtil = {
    timestamp : function(d){
        if (d === undefined) {
            return "";
        }
            return String(d.getFullYear()+ "-" +
                String(d.getMonth() + 1).fillZero(2) +  "-"+
                String(d.getDate()).fillZero(2) + " "+
                String(d.getHours()).fillZero(2) + ":"+
                String(d.getMinutes()).fillZero(2)).replace("T", "").replace("NaN", "");
    }
}

String.prototype.fillZero = function(width){
    return this.length >= width ? this:new Array(width-this.length+1).join('0')+this;//남는 길이만큼 0으로 채움
}