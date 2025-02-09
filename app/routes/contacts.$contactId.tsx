import { json } from "@remix-run/node";
import { Form, useFetcher, useLoaderData } from "@remix-run/react";
import type { FunctionComponent } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";

import type { ContactRecord } from "../data";

import { getContact, updateContact } from "../data";

export const loader = async ({ 
    params, 
}: LoaderFunctionArgs) => {
    invariant(params.contactId, "Missing contactId parameter");
    const contact = await getContact(params.contactId);
    if(!contact) {
        throw new Response("Contact not found", { status: 404 });
    }
    return json({ contact });
};

export const action = async ({
    params,
    request,
}: ActionFunctionArgs) => {
    invariant(params.contactId, "Missing contactId parameter");
    const formData = await request.formData();
    return updateContact(params.contactId, {
        favorite: formData.get("favorite") === "true",
    })
};

export default function Contact() {
    const { contact } = useLoaderData<typeof loader>();

    return (
        <div id="contact">
            <div>
                {contact && (
                    <img
                        alt={`${contact.name} ${contact.adjective} ${contact.scientific_name} avatar`}
                        key={contact.avatar}
                        src={contact.avatar}
                    />
                )}
            </div>

            <div>
                <h1>
                    {contact && (contact.name || contact.adjective) ? (
                        <>                            
                            {contact.name} {contact.adjective}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    {contact && <Favorite contact={contact} />}
                </h1>
                <h2>
                    {contact && contact.scientific_name ? (
                        <>                            
                            ({contact?.scientific_name})
                        </>
                    ) : (
                        <i>No Name</i>
                    )}
                </h2>

                {contact && contact.description ? (
                    <p>
                        {contact.description}
                    </p>
                ) : null}

                {contact && contact.notes ? <p>{contact.notes}</p> : null}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>

                    <Form
                        action="destroy"
                        method="post"
                        onSubmit={(event) => {
                            const response = confirm(
                                "Please confirm you want to delete this record."
                            );
                            if (!response) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

const Favorite: FunctionComponent<{
    contact: Pick<ContactRecord, "favorite">;
}> = ({ contact }) => {
    const fetcher = useFetcher();
    const favorite = fetcher.formData
    ? fetcher.formData.get("favorite") === "true"
    : contact.favorite;

    return (
        <fetcher.Form method="post">
            <button
                aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                name="favorite"
                value={favorite ? "false" : "true"}
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
};
