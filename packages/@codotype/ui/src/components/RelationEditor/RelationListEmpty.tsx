import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

// // // //

interface RelationListEmptyProps {
    onClick: () => void;
}

export function RelationListEmpty(props: RelationListEmptyProps) {
    return (
        <div className="card-body text-center">
            <h5 className="mb-0 mt-1 text-muted">No Relations added yet</h5>
            <p className="text-muted mt-2 mb-0">
                Define references between Schemas
            </p>
            <div className="row flex justify-center mt-2">
                <div className="col-lg-12">
                    <button
                        className="btn btn-sm btn-outline-primary"
                        onClick={props.onClick}
                    >
                        <FontAwesomeIcon className="mr-2" icon={faPlus} />
                        Add Relation
                    </button>
                </div>
            </div>
        </div>
    );
}
