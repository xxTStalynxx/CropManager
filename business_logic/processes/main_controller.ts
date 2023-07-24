import { Request, Response } from "express";

export const showMain = (req: Request, res: Response) => {
    res.render('main');
}

export const showNosotros = (req: Request, res: Response) => {
    res.render('nosotros');
}

export const showCropManager = (req: Request, res: Response) => {
    res.render('cropmanager');
}

export const showForgot = (req: Request, res: Response) => {
    if (req.session.user){
        res.redirect('/inicio');
    } else {
        res.render('forgot', { error: '' });
    }
}