import { z } from "zod";

export const signupInput = z.object({
    username: z.string()
        .min(1, {
            message: "Username cannot be empty."
        })
        .max(21, {
            message: "Username too long."
        }).refine(
            (value) => !value.includes(" "), {
            message: 'Username cannot contain spaces.', 
        }
        ),
    password: z.string()
        .min(8, {
            message: "Password cannot be empty."
        })
        .max(21, {
            message: "Password too long."
        }).refine((p) => {
            return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?+-=()~`<>|{}:;'"])/.test(p) && !p.includes(" ");
        }, {
            message: "Password must contain at least one uppercase letter, one number, and one special character, and cannot contain spaces."
        }),
});

export const usernameInput = z.string()
    .min(1,
        {
            message: "Username cannot be empty."
        })
    .max(21, {
        message: "Username too long."
    }).refine(
        (value) => !value.includes(" "), {
        message: 'Username cannot contain spaces.',
    });

export const passwordInput = z.string()
    .min(8, {
        message: "Password too short."
    })
    .max(21, {
        message: "Password too long."
    })
    .refine((value) => {
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*?+-=()~`<>|{}:;'"])/.test(value) && !value.includes(" ");
    }, {
        message: "Password must contain at least one uppercase letter, one number, and one special character, and cannot contain spaces."
    });

export const courseDetailsInput = z.object({
    title: z.string().min(1, { message: "Title cannot be empty." }).max(30, { message: "Title too long." }),
    description: z.string().min(1, { message: "Description cannot be empty." }).max(50, { message: "Description too long." }),
    imageLink: z.string().min(1, { message: "Link cannot be empty." }).url({ message: "Link a valid url for image." }),
    price: z.number().min(1, { message: "Price cannot be empty." }),
    published: z.boolean()
});

export const titleInput = z.string().min(1, { message: "Title cannot be empty." }).max(30, { message: "Title too long." });
export const descriptionInput = z.string().min(1, { message: "Description cannot be empty." }).max(50, { message: "Description too long." });
export const imageLinkInput = z.string().min(1, { message: "Link cannot be empty." }).url({ message: "Link a valid url for image." });
export const priceInput = z.number().min(1, { message: "Price cannot be empty." });
export const publishedInput = z.boolean();

