(function() {
    window.convertSpecsToTests = function(specs) {
        let trimmedSpecs = trim(specs);

        if (trimmedSpecs === "") {
            return "";
        }

        let rawLines = trimmedSpecs.split("\n");
        let lines = _.chain(rawLines)
            .map(trim)
            .reject(line => line === "")
            .value();

        let [methodSpecs, classSpecs] = _.partition(lines, line => line[0] === "-");

        return createClassLinesFromSpec(classSpecs, methodSpecs);
    };

    function createClassLinesFromSpec(classSpecs, methodSpecs) {
        let methodLines = _.chain(methodSpecs)
            .reject(spec => spec === "-")
            .map(createMethodLinesFromSpec)
            .map(lines => lines.join("\n"))
            .value();

        let className = classSpecs[0] || "TestClass";

        let classLines = new Array();

        if (window.convertSpecsToTestsConfiguration.addTestFixtureAttribute) {
            classLines.push("[TestFixture]");
        }

        let mainClassLine = window.convertSpecsToTestsConfiguration.fixtureModifier
            + " class " + convertToSymbolName(className);

        if (window.convertSpecsToTestsConfiguration.baseClass.length > 0) {
            mainClassLine += " : " + window.convertSpecsToTestsConfiguration.baseClass;
        }

        classLines.push(mainClassLine);
        classLines.push("{");
        classLines.push(methodLines.join("\n\n"));
        classLines.push("}");
        classLines.push("");

        return classLines.join("\n");
    }

    function createMethodLinesFromSpec(spec) {
        let methodName = convertToSymbolName(spec);
        
        return _.map([
            "[Test]",
            `public ` + window.convertSpecsToTestsConfiguration.testReturnType + ` ${methodName}()`,
            "{",
            indent("throw new System.NotImplementedException();"),
            "}"
        ], indent);
    }

    function convertToSymbolName(spec) {
        let sanitizedName = trim(spec)
            .replace(/^-+\s*/, "")
            .replace(/[^a-z0-9äöüß ]/ig, "")
            .replace(/\s*$/i, "")
            .replace(/\s+/g, "_");

        return uppercaseFirst(sanitizedName);
    }

    function uppercaseFirst(value) {
        return value.length === 0 ?
            value :
            value[0].toUpperCase() + value.substr(1);
    }

    function indent(line) {
        return "    " + line;
    }

    function trim(string) {
        return string.replace(/^\s+|\s+$/g, "");
    }
})();
