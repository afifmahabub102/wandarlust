'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export const createDestination = async (formdata) => {
    const destination = Object.fromEntries(formdata.entries());
    console.log(destination);

    const res = await fetch('http://localhost:5000/destinations', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(destination),
    })
    const data = await res.json();
}

export const updateDestination = async (id, formdata) => {
    const updatedDestination = Object.fromEntries(formdata.entries());
    console.log(id, updatedDestination);

    const res = await fetch(`http://localhost:5000/destinations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedDestination),
    })

    const data = await res.json();
    if (data.modifiedCount > 0) {
        revalidatePath('/destinations');
        redirect('/destinations');
    }
}

export const deleteDestination = async (id) => {
    const res = await fetch(`http://localhost:5000/destinations/${id}`, {
        method: 'DELETE'
    })

    const data = await res.json()
    if (data.deletedCount > 0) {
        revalidatePath('/destinations')
        redirect('/destinations');
    }
    return data;
}


