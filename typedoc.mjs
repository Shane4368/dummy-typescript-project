import TypeDoc from "typedoc";

/**
 * @param {Partial<TypeDoc.TypeDocOptions>} options
 */
async function buildDocumentation(options)
{
    const app = new TypeDoc.Application();

    app.options.addReader(new TypeDoc.TSConfigReader());

    app.bootstrap({
        entryPoints: ["source/index.ts"],
        plugin: "none",
        theme: options.theme,
        highlightTheme: "material-ocean",
        readme: "README.md",
        includeVersion: true,
        excludePrivate: true,
        excludeInternal: false,
    });

    const project = app.convert();

    if (project)
        await app.generateDocs(project, options.out);
}

async function main()
{
    await buildDocumentation({
        out: "documentation/default",
        theme: "node_modules/typedoc-selectable-themes/bin/default"
    });

    await buildDocumentation({
        out: "documentation/minimal",
        theme: "node_modules/typedoc-selectable-themes/bin/minimal"
    });
}

main().catch(console.error);
