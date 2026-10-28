"use client";
import { AlertDialog, Button } from "@heroui/react";
import { Trash2 } from "lucide-react";
import { deleteDestination } from "../lib/actions";

export function DeleteModal({ destination }) {
    const {
        _id ,
        destinationName,
        country,
        category,
        price,
        duration,
        departureDate,
        imageUrl,
        description,
    } = destination;

    const handleDelete = async( id ) => {
        await deleteDestination( id ) ;
    }

    return (
        <AlertDialog>
            <Button
                className="flex items-center gap-1.5 rounded border  bg-red-500 border-[#EF4444] px-3 py-1.5 text-xs font-medium text-white"
            >
                <Trash2 size={12} />
                Delete
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-100">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete {destinationName} permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete <strong>{destinationName}</strong> package and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button onClick={() => handleDelete(_id)} slot="close" variant="danger">
                                Confirm Delete
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}