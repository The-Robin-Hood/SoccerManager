import { z } from "zod";

export const editPlayerSchema = z.object({
    name: z.string().min(3, { message: "Name should be at least 3 characters long" }).max(30, { message: "Name should be at most 30 characters long" }),
    jerseyNumber: z.number(),
    height: z.number(),
    weight: z.number(),
    nationality: z.string().min(3).max(20),
    position: z.enum(["Goalkeeper", "Defender", "Midfielder", "Forward"]),
    starter: z.string(),
});



function validateEditPlayer(data: EditPlayerSchema) {
    try {
        editPlayerSchema.parse(data);
    } catch (err) {
        return err;
    }
}

export type EditPlayerSchema = z.infer<typeof editPlayerSchema>;
export default validateEditPlayer;