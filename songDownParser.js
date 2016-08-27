


/*
Rules





contains


The context data structure

line | string | The current line


*/


var LINE_TYPE_BLANK        = 0;
var LINE_TYPE_SONG_TITLE   = 1;
var LINE_TYPE_SECTION_NAME = 2;
var LINE_TYPE_CHORDS       = 3;


var CONTEXT_ONE_LINE = 0;


var ruleDefinitions = {
    'contains' : {
        'context' : CONTEXT_ONE_LINE,
        'predicate' : function(rule, context) {
            return context.line.search(rule.regex) != -1;
        }
    }
};


// default priority = 0 (if undefined)
// priorities can go negative (lower priority)
// or positive (higher priority)


var globalRules = [{
    'definitionName' : 'contains',
    'name' : 'hasColon',
    'regex' : new RegExp(':'),
    'lineType' : LINE_TYPE_SECTION_NAME
},{
    'definitionName' : 'contains',
    'name' : 'commonSectionName',
    'regex' : new RegExp('intro|verse|chorus', 'i'),
    'lineType' : LINE_TYPE_SECTION_NAME
}];


function getRulePriority(rule) {
    return ('priority' in rule) ? rule.priority : 0;
}

function parseSongUsingRules(text, rules)
{
    var song = {
        'title':null,
        'credit':null,
        'sections':[],
        'key':null,
        'errors':[]
    };
    //
    // Check the rules
    //
    for(var ruleIndex = 0; ruleIndex < rules.length; ruleIndex++) {
        var rule = rules[ruleIndex];
        if(!('definition' in rule)) {
            if(!('definitionName' in rule)) {
                song.errors.push('rule "' + rule.name + '" at index ' + ruleIndex + ' has no "definition" or "definitionName"');
                continue;
            }
            var ruleDefinition = ruleDefinitions[rule.definitionName];
            if(typeof ruleDefinition == 'undefined') {
                song.errors.push('rule "' + rule.name + '" at index ' + ruleIndex + ' has an unknown definitionName "' + rule.definitionName + '"');
                continue;
            }
            rule.definition = ruleDefinition;
        }
    }

    if(song.errors.length > 0) {
        return song; // don't parse the song if the rules have errors
    }

    var lines = text.split("\n");
    var lineIndex = 0;

    var context = {};
    var lineObjects = [];

    for(var lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        var line = lines[lineIndex];
        var lineObject = {'line':line,'matchingRules':[]};
        context.line = line;
        for(var ruleIndex = 0; ruleIndex < rules.length; ruleIndex++) {
            var rule = rules[ruleIndex];
            
            // Add rule if it is the right priority and matches the line
            if(lineObject.matchingRules.length == 0) {
                if(rule.definition.predicate(rule, context)) {
                    lineObject.matchingRules.push(rule);
                    lineObject.matchingRulesPriority = getRulePriority(rule);
                }
            } else {
                var rulePriority = getRulePriority(rule);    
                if(rulePriority >= lineObject.matchingRulesPriority) {
                    if(rule.definition.predicate(rule, context)) {
                        lineObject.matchingRules.push(rule);
                    }
                }
            }

        }

        console.log(lineObject);
        lineObjects.push(lineObject);
    }

    song.debugLineObjects = lineObjects;
    return song;
}

