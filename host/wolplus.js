(function () {

    /**
     * Inject translation
     */
    var timeout = 100;
    (function(){
        if (window['$WowheadPower']) {
            transTip(window['$WowheadPower']);
        } else {
            console.log(timeout);
            setTimeout(arguments.callee,timeout += 50);
        }
    })();

    var transTip = function ($Whp) {

        function inject(script) {
            var head = document.querySelector('head');
            var el = document.createElement('script');
            el.setAttribute("src", script);
            head.appendChild(el); // Run the 'spell' script from 178.com
            head.removeChild(el); // Clean up
        }

        // save original $WowheadPower.registerSpell
        var origReg = $Whp.registerSpell;

        // Set $187DB enviroment
        window.$178DB = {
            'spells': {},
            'regstSpell': function (cnSpellObj) {
                var currentSpell = $178DB.spells[cnSpellObj['id']];
                //replace en tips with cn tips
                currentSpell[2]['tooltip_enus'] = cnSpellObj['tip'];
                //call the origin register
                origReg.apply($Whp, currentSpell);
            }
        };

        // New $WowheadPower.registerSpell as a bridge
        $Whp.registerSpell = function (id, zero, spellObj) {
            var cnSpellJs = 'http://db.178.com/wow/cn/a/spell/{id}.js'.replace('{id}', id);
            $178DB['spells'][id] = [id, zero, spellObj];
            // OK, It's your turn now
            inject(cnSpellJs);
        };
    }

})();