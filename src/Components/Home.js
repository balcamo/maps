import React from 'react';
import { Breadcrumb, BreadcrumbItem, Button } from 'reactstrap';
import * as urls from '../urlsConfig';

function Home() {
    return (
        <div>
            <Breadcrumb className="Breadcrumbs">
                <BreadcrumbItem ><a href={urls.homePage}>Apiary</a></BreadcrumbItem>
                <BreadcrumbItem active>Maps</BreadcrumbItem>
            </Breadcrumb>
            <h1>Maps</h1>
            <Button size="lg" className="Breadcrumbs" >
                <a href="/disconnects">Disconnects</a>
            </Button>
        </div>
    )
}
export default Home;