import * as React from "react";

// // // //

export function PluginTechTag(props: { tag: string }) {
    const { tag } = props;
    return <span className="badge badge-light mr-1 mt-2">{tag}</span>;
}