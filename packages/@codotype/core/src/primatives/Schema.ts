import { v4 as uuidv4 } from "uuid";
import { SchemaInput, Attribute, RelationInput } from "..";
import { SchemaCreators } from "../schema";
import { TokenPluralization } from "../token";
import { PluginConfiguration } from "../plugin";

// // // //

interface SchemaBuilderParams {
    id?: string;
    attributes: Attribute[];
    relations: RelationInput[];
    identifiers: TokenPluralization;
    source?: SchemaCreators;
    locked?: boolean;
    removable?: boolean;
    configuration?: PluginConfiguration;
    internalNote?: string;
}

export class SchemaBuilder implements SchemaInput {
    id: string = uuidv4();
    attributes: Attribute[];
    relations: RelationInput[];
    identifiers: TokenPluralization;
    source: SchemaCreators = SchemaCreators.user;
    locked: boolean = false;
    removable: boolean = true;
    configuration: PluginConfiguration = {};
    internalNote: string = "";

    constructor(params: SchemaBuilderParams) {
        this.attributes = params.attributes;
        this.relations = params.relations;
        this.identifiers = params.identifiers;

        this.id = params.id || this.id;
        this.source = params.source || this.source;
        this.locked = params.locked !== undefined ? params.locked : this.locked;
        this.removable =
            params.removable !== undefined ? params.removable : this.removable;
        this.configuration = params.configuration || this.configuration;
        this.internalNote = params.internalNote || this.internalNote;
    }
}
