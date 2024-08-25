import './adminPage.scss'
import React from "react";

import Sidebar from "@/components/Sidebar";
import HeaderAdmin from "@/components/HeaderAdmin";
import DishesPage from "@/pages/admin/dishesPage";
import CreateDish from "@/pages/admin/addDishPage";
import EditDish from "@/pages/admin/editDishPage"

import TablePage from "@/pages/admin/tablesPage";
import CreateTable from "@/pages/admin/addTablePage";
import EditTable from "@/pages/admin/editTablePage";
import ReservationPage from "@/pages/admin/reservationPage";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  LinkProps,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';

export function AdminPage() {
    return (
        <div className="app">
            <HeaderAdmin />
            <div className="main">
                <Sidebar />
                <Switch>
                    <Route path="/admin/dishes-management" exact>
                        <DishesPage />
                    </Route>
                    <Route path="/admin/dishes-management/create" exact>
                        <CreateDish />
                    </Route>
                    <Route path="/admin/dishes-management/edit/:id" >
                        <EditDish />
                    </Route>
                    <Route path="/admin/tables-management" exact>
                        <TablePage />
                    </Route>
                    <Route path="/admin/tables-management/create" exact>
                        <CreateTable />
                    </Route>
                    <Route path="/admin/tables-management/edit/:id" >
                        <EditTable />
                    </Route>
                    <Route path="/admin/reservation-management" exact>
                        <ReservationPage />
                    </Route>
                
                    <Redirect to="/admin/dishes-management" />
                </Switch>
            </div>
            <ToastContainer autoClose={1000}/>
        </div>
  );
}
