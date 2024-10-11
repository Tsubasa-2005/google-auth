'use client';

import React from 'react';
import Link from 'next/link';

const Page = () => {
    return (
        <div>
            <h1>Welcome to Our Service</h1>
            <Link href="/signin">
                <button>Signin</button>
            </Link>
        </div>
    );
};

export default Page;