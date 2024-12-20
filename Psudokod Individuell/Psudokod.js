
/* SPLIT THE NOTA
START

    FUNCTION splitTheNota()

        INPUT prisInput
        INPUT dricksInput
        INPUT antalPersonerInput


        //Kontrollera om något av inputfälten är tomma 
        IF prisInput, dricksInput eller antalPersonerInput är tom THEN
            SET slutResultat = "Vänligen fyll i alla fält"
            RETURN slutResultat
        ENDIF
        
        // Konvertera input till nummer 
        SET pris = konvertera prisInput till ett nummer.
        SET dricksProcent = konvertera dricksInput till ett nummer.
        SET antalPersoner = konvertera antalPersonerInput till ett nummer.
        
        
        //Kontrollera om inmatning misslyckades pågrund av NaN (Not a Number)
        IF pris, dricksProcent eller antalPersoner IS NaN THEN
            SET slutResultat = " Ogiltig inmatning, ange endast siffror"
            RETURN slutResultat
        ENDIF
            
        //Kontrollera om värden är 0 eller mindre än 0
        IF pris, dricksProcent eller antalPersoner är mindre än 0 eller lika med 0 THEN
            SET slutResultat =  "Ogiltig inmatning, alla värden måste vara större än 0"
            RETURN slutResultat
        ENDIF
       
        //Beräkna dricksBelopp, totalBelopp och perPerson.
        CALCULATE
            SET dricksBelopp= pris * dricksProcent
            SET totalBelopp = pris + dricksBelopp
            SET perPerson = totalBelopp / antalPersoner
        ENDCALCULATE

        //visa resultat
        SET slutResultat = "belopp per person är " + perPerson
        RETURN slutResultat
            
    ENDFUNCTION
        
    CALL FUNCTION splitTheNota()

END


WORDGAME

START

    FUNCTION play()
        
        //skapa ordbok med gitiga ord 
        SET ordBok = ["FOUR", "FOUL", "FOOL", "FOOT", "FORT", "FORE", "FIRE", "FIVE"]
        
        //Sätt startord och slutord
        SET startOrd = "FOUR"
        SET slutOrd = "FIVE"

        // Introduktion till spelet
        PRINT "Målet med detta spel är att omvanla ordet "FOUR" till "FIVE" genom att ändra 1 bokstav i taget, Lycka till!

        
        IF CALL FUNCTION wordCheck(startOrd, ordBok) IS false THEN
            PRINT "Startord är ogiltigt"
            RETURN
        ENDIF

        IF CALL FUNCTION wordCheck(slutOrd, ordBok) IS false THEN
            PRINT "slutord är ogiltigt"
            RETURN
        ENDIF

        // Sätt currentWord till startOrd.
        SET currentWord = startOrd

        //Starta spel-loop
        LOOP UNTIL currentWord == slutOrd
            PRINT "Nuvarande ord är: " + currentWord + " Ange ett ord som skiljer sig med en bokstav."
            INPUT userInput

            //Kontrollera om userInput är ett giltigt ord från ordbok och om det skiljer sig med endast en bokstav 
            IF CALL FUNCTION wordCheck(userInput, ordBok) AND
                CALL FUNCTION isOneLetterApart(currentWord, userInput) THEN 
                SET currentWord = userInput //uppdatera currentWord
                PRINT "Bra jobbat! Du är nu på ordet : " + currentWord
            ELSE 
                PRINT "Ogiltigt ord, Försök igen!" //Om ordet är ogiltigt 
            ENDIF 
        ENDLOOP
        
        // när anändaren har omvanlat FOUR till FIVE
        IF currentWord == slutOrd THEN 
            PRINT " Grattis! Du klarade spelet!" 
        ENDIF
    ENDFUNCTION

    FUNCTION isOneLetterApart(wordOne, wordTwo)
        SET diffCount = 0 // sätt en räknare för skillnader mellan bokstäver 

            //Loopa genom index och jämför varje bokstav 
            LOOP from 0 to length of wordOne -1
                IF wordOne[index] != wordTwo[index] THEN
                    SET diffCount = diffCount +1 //Öka räknaren om bokstäverna skiljer sig
                END IF
            ENDLOOP

        RETURN diffCount === 1 //Kontrollera om endast en bokstav ändrats
    ENDFUNCTION

    FUNCTION wordCheck(word, ordBok)
            IF word in ordBok THEN //Kontrollera om ordet finns i ordboken
                RETURN true
            ELSE
                PRINT " Ordet är ogiltigt, försök igen" // om ordet ej finns i ordboken.
                RETURN false
            END IF
    ENDFUNCTION

    CALL FUNCTION play()

END
*/
