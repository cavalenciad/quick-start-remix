import type {
    ActionFunctionArgs, 
    LoaderFunctionArgs 
} from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { 
    Form, 
    useLoaderData,
    useNavigate,
} from "@remix-run/react";
import invariant from "tiny-invariant";

import { getContact, updateContact } from "../data";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    invariant(params.contactId, "Missing contactId param");
    const contact = await getContact(params.contactId);
    if (!contact) {
        throw new Response("Not Found", { status: 404 });
    }
    return json({ contact });
};

export const action = async ({
    params,
    request,
}: ActionFunctionArgs) => {
    invariant(params.contactId, "Missing contactId param");
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateContact(params.contactId, updates);
    return redirect(`/contacts/${params.contactId}`);
};

export default function EditContact() {
    const { contact } = useLoaderData<typeof loader>();
    const navigate = useNavigate();

    return (
        <Form key={contact.id} id="contact-form" method="post">
            <p>
                <span>Name</span>
                <input
                    aria-label="Name"
                    defaultValue={contact.name}
                    name="name"
                    placeholder="Name"
                    type="text"
                />
                <input
                    aria-label="Sufix"
                    defaultValue={contact.adjective }
                    name="adjective"
                    placeholder="Adjective"
                    type="text"
                />
            </p>
            <label>
                <span>Scientific Name</span>
                <input
                    defaultValue={contact.scientific_name}
                    name="scientific_name"
                    placeholder="Scientific Name"
                    type="text"
                />
            </label>
            <label>
                <span>Description</span>
                <input
                    defaultValue={contact.description}
                    name="description"
                    placeholder="Description"
                    type="text"
                />
            </label>
            <label>
                <span>Avatar URL</span>
                <input
                    aria-label="Avatar URL"
                    defaultValue={contact.avatar}
                    name="avatar"
                    placeholder="https://example.com/avatar.jpg"
                    type="text"
                />
            </label>
            <label>
                <span>Notes</span>
                <textarea defaultValue={contact.notes} name="notes" rows={6} />
            </label>
            <p>
                <button type="submit">Save</button>
                <button onClick={() => navigate(-1)} type="button">
                    Cancel
                </button>
            </p>
        </Form>
    );
}
