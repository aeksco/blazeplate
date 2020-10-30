import { RuntimeProxyAdaptor } from "../utils/runtimeProxyAdaptor";
import {
    testState,
    RuntimeLogLevels,
    normalizeProjectInput,
    RuntimeConstructorParams,
    FileOverwriteBehaviors,
    Project,
    RuntimeInjectorProps,
    GeneratorConstructorParams,
    buildTokenCasing,
    Primatives,
} from "@codotype/core";
// import { LocalFileSystemAdaptor } from "../LocalFileSystemAdaptor";
import { InMemoryFileSystemAdaptor } from "../InMemoryFileSystemAdaptor";
import { NodeRuntime } from "../node-runtime";

// // // //

// const x = new Primatives.Plugin({
//     id: "my-plugin",
//     label: "My Plugin",
//     description: "",
//     project_path: "plugin-output",
//     schemaEditorConfiguration: {
//         defaultRelations: [],
//         defaultSchemas: [],
//         defaultAttributes: [],
//         configurationGroups: [],
//         documentation: "",
//         supportedDatatypes: [],
//         supportedRelations: [],
//         attributeAddons: [],
//         enableAttributeDefaultValue: false,
//     },
// });

export const project: Project = normalizeProjectInput({
    projectInput: {
        schemas: [testState.userSchema, testState.movieSchema],
        relations: [],
        configuration: {},
        pluginID: "123",
        pluginVersion: "0.1.1",
        id: "project-id",
        identifiers: buildTokenCasing("My Project"),
    },
});

export const runtimeConstructorOptions: RuntimeConstructorParams = {
    cwd: "/test-cwd/",
    logLevel: RuntimeLogLevels.verbose,
    fileOverwriteBehavior: FileOverwriteBehaviors.force,
    fileSystemAdaptor: new InMemoryFileSystemAdaptor(),
};

export const baseGeneratorOptions: RuntimeInjectorProps = {
    dest: "destination",
    resolved: "my/resolved/path",
    project,
    plugin: testState.cdkGeneratorMeta,
    runtime: new NodeRuntime(runtimeConstructorOptions),
};

export const generatorPrototype: GeneratorConstructorParams = {
    name: "Prototype Generator",
    write: jest.fn(),
    compileInPlace: [],
    forEachSchema: jest.fn(),
    forEachRelation: jest.fn(),
    forEachReverseRelation: jest.fn(),
};

export const generatorPrototype01: GeneratorConstructorParams = {
    name: "ModuleComponents",
    async write({ runtime }) {
        runtime.writeFile("", '{\nname: "project"\n}');
    },
    async forEachSchema({ schema, runtime }) {
        // Destination for module / components directory
        const moduleComponentsDest =
            "components/" + schema.identifiers.singular.snake + "_editor/";

        // Ensures module components directory
        await runtime.ensureDir(moduleComponentsDest);

        // TODO - ensure page here
        await runtime.renderComponent({
            src: "page.tsx.ejs",
            dest: `pages/${schema.identifiers.plural.snake}.tsx`,
            data: { schema },
        });
    },
};

// // Defines typed generator constant
export const generatorPrototype02: GeneratorConstructorParams = {
    name: "Fullstack TypeScript Generator",
    async write(this: RuntimeProxyAdaptor) {
        await this.composeWith("./base");
        await this.composeWith("./rest-api");
        await this.composeWith("./react-components");
        await this.composeWith("./react-components/form");
    },
};
