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

        return [
            "[TestFixture]",
            "public class " + convertToSymbolName(className),
            "{",
            methodLines.join("\n\n"),
            "}",
            ""
        ].join("\n");
    }

    function createMethodLinesFromSpec(specification) {
        let methodName = convertToSymbolName(specification);
        
        return _.map([
            "[Test]",
            `public void ${methodName}()`,
            "{",
            indent("throw new System.NotImplementedException();"),
            "}"
        ], indent);
    }

    function convertToSymbolName(specification) {
        let sanitizedName = trim(specification)
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
