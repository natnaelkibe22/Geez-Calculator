class Translator {
    #privateField
    static digit = {
        1: '\u1369',
        2: '\u136A',
        3: '\u136B',
        4: '\u136C',
        5: '\u136D',
        6: '\u136E',
        7: '\u136F',
        8: '\u1370',
        9: '\u1371',
        10: '\u1372',
        20: '\u1373',
        30: '\u1374', 
        40: '\u1375',
        50: '\u1376',
        60: '\u1377',
        70: '\u1378',
        80: '\u1379',
        90: '\u137A',
        100: '\u137B',
        10000: '\u137C'
        };
    
    static translator(number) {
        var geeznumber = ""
        var tmp = 0
        var i = 0
        while(number > 0) {
            tmp = number % 10;
            geeznumber = digit[tmp*(10**i)] + geeznumber;
            i = i + 1;
            number = Math.floor(number / 10);
        }
  
        return geeznumber;
    }
}