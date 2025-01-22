import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import type { FunctionComponent } from "react";

import type { ContactRecord } from "../data";

import { getContact } from "../data";

export const loader = async ({ params }) => {
    const contact = await getContact(params.contactId);
    return json({ contact });
  };

export default function Contact() {
    const { contact } = useLoaderData<typeof loader>();
/*     const contact = {
        first: "Your",
        last: "Name",
        avatar: "https://placecats.com/200/200",
        twitter: "your_handle",
        notes: "Some notes",
        favorite: true,
    }; */

    return (
        <div id="contact">
            <div>
                <img
                    alt={`${contact.name} ${contact.scientific_name} avatar`}
                    key={contact.avatar}
                    src={contact.avatar}
                />
            </div>

            <div>
                <h1>
                    {contact.name || contact.scientific_name ? (
                        <>                            
                            {contact.name}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact} />
                </h1>
                <h2>
                    {contact.name || contact.scientific_name ? (
                        <>                            
                            ({contact?.scientific_name})
                        </>
                    ) : (
                        <i>No Name</i>
                    )}
                </h2>

                {contact.description ? (
                    <p>
                        {contact?.description}
                    </p>
                ) : null}

                {contact.notes ? <p>{contact.notes}</p> : null}

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
    const favorite = contact.favorite;

    return (
        <Form method="post">
            <button
                aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                name="favorite"
                value={favorite ? "false" : "true"}
            >
                {favorite ? "★" : "☆"}
            </button>
        </Form>
    );
};
