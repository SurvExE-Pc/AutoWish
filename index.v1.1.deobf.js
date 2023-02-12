if(localStorage.autoWish==undefined) {
localStorage.setItem("autoWish",JSON.stringify({
    wish_count: 0,
    fails: 0,
    good: 0,
    total_runs: 0,
    primospent: 0,
    usedbefore: false
}))
}

// VARIABLES //
var autoWish = {},
    wish10btn = document.getElementsByClassName("ten wish-button svelte-fyne08")[0],
    wishCloseBtn = document.getElementsByClassName("close svelte-1x1mrmk")[0];

// WARNING //
console.info(`Provided under MIT License.
Copyright 2023 SurvExE_Pc

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

For any damage to user data,
YOU ACKNOWLEDGE AND AGREE THAT, TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE ENTIRE RISK ARISING OUT OF YOUR ACCESS TO AND USE OF THE SERVICES REMAINS WITH YOU. IN NO EVENT SHALL I BE LIABLE FOR ANY SPECIAL, INCIDENTAL, INDIRECT, EXEMPLARY OR CONSEQUENTIAL DAMAGES WHATSOEVER (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF DATA, PROFITS OR ANY OTHER PECUNIARY LOSS) ARISING OUT OF THE USE OF OR INABILITY TO USE THE SERVICES, EVEN IF I HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, OR FOR ANY CLAIM BY ANY THIRD PARTY.

Other warnings,
You must be on the homepage and have the wish x10 button fully visable for this to work.
You must be on wishsimulator.app
You must use https
You must have Unlimited Fates enabled
If you reset browser data and or localData all of your AutoWish and WishSimulator data will be wiped.
`);
alert("Please read stuff in the console.");

// SETUP //
autoWish.backup = JSON.parse(localStorage.autoWish);
autoWish["fails"] = autoWish.backup.fails; // Fails
autoWish["wish_count"] = autoWish.backup.wish_count; // Wish count
autoWish["good_runs"] = autoWish.backup.good; // Successfull runs
autoWish["total_runs"] = autoWish.backup.total_runs; // Total amount of runs

// READ ME STUFF //
console.info("READ ALL STUFF BELOW AND ABOVE THIS MESSAGE!!");
console.info(`To stop wishing press 0 or run autoWish.stop() in the console.
To start wishing run autoWish.wish() in the console.`);

// WISHING //
    autoWish.stop = () => {
        clearInterval(autoWish['loop']);
        console.log("Backing data up...");
        autoWish.backup.primospent += (parseInt(autoWish['wish_count'])*160);
        autoWish.backup.fails += autoWish['fails'];
        autoWish.backup.good += autoWish['good_runs'];
        autoWish.backup.total_runs += autoWish['total_runs'];
        autoWish.backup.wish_count += autoWish['wish_count'];
        localStorage.setItem("autoWish",JSON.stringify(autoWish.backup));
        console.log("Data backed up!");
        console.info(`Wished ${autoWish.backup.wish_count} times,
Ran a total of ${autoWish.backup.total_runs} times,
Runs with 0 fails: ${autoWish.backup.good},
Failed amount of runs: ${autoWish.backup.fails},
Primogems / Genesis Crystals spent: ${autoWish.backup.primospent}.`);
    }

autoWish.wish = () => {
    if (JSON.parse(localStorage.config).config.fates) {
    autoWish.backup.usedbefore = true;
    alert("Wishing process has started!\n\nRun autoWish.stop() to stop.\nOr press the 0 key.");

    autoWish["loop"] = setInterval(() => { // Main loop
        console.info("Wishing..");
        wish10btn.click();
        setTimeout(() => {
            try {
                wishCloseBtn.click();
                console.log("Clicked close button.");
                autoWish["good_runs"] = (parseInt(autoWish["good_runs"]) + 1); // updates successfull run count
            } catch {
                console.warn("Missed timing for closing.");
                autoWish["fails"] = (parseInt(autoWish["fails"]) + 1); // updates fail count
            } finally {
                console.info("Wished 10 times.");
                autoWish["wish_count"] = (parseInt(autoWish["wish_count"]) + 10); // updates wish count
            }
        }, 100);
        autoWish["total_runs"] = (parseInt(autoWish["total_runs"]) + 1); // updates total run count
        setTimeout(50); // delay for saftey to not break the wishing simulator
    }, 350); // delay amount of all the values +100
    } else {
        console.warn("Please enable Unliimited Fates in the options!!");
    }
};
console.info("AutoWish v1.1 is ready!");
console.warn("If you change the banner you must reload.");
if (!autoWish.backup.usedbefore) {
    console.log("Enjoy my service!!");
} else {
    console.log("Welcome back!!");
};
