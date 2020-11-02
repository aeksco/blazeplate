import * as React from "react";
import {
    applyPropertyPreview,
    PropertyPreview,
    PropertyPreviewLayoutVariant,
} from "@codotype/core";

// // // //

/**
 * PropertyPreviewRenderer
 * @param props.data - the data being rendered by DataPreview
 * @param props.dataPreview - The DataPreview object
 */
export function PropertyPreviewRenderer(props: {
    data: any;
    propertyPreview: PropertyPreview;
}) {
    const { propertyPreview } = props;
    const { variant } = propertyPreview;
    const compiledTemplate = applyPropertyPreview(props);

    if (compiledTemplate === "") {
        return null;
    }

    // Handle CollectionTemplateVariant
    if (variant === PropertyPreviewLayoutVariant.CODE_DARK) {
        return (
            <pre className="mb-0 py-1 px-2 bg-dark text-light rounded">
                {compiledTemplate}
            </pre>
        );
    }

    if (variant === PropertyPreviewLayoutVariant.CODE_LIGHT) {
        return (
            <pre className="mb-0 py-1 px-2 bg-light border-dark text-dark rounded border border-dark">
                {compiledTemplate}
            </pre>
        );
    }

    if (variant === PropertyPreviewLayoutVariant.BADGE_DARK) {
        return (
            <span className="px-2 py-1 bg-dark text-light rounded">
                {compiledTemplate}
            </span>
        );
    }

    if (variant === PropertyPreviewLayoutVariant.BADGE_LIGHT) {
        return (
            <span className="px-2 py-1 bg-light text-dark rounded border border-dark">
                {compiledTemplate}
            </span>
        );
    }

    // Return null to prevent invariant error
    return null;
}