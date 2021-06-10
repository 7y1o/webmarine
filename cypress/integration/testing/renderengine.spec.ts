/// <reference types="cypress"/>
import CRenderEngine from "../../../src/render/CRenderEngine";
import {BoxGeometry, Mesh, MeshBasicMaterial, OrthographicCamera, Scene} from "three";

describe('CRenderEngine:', function () {
    const render = new CRenderEngine();

    it('constructor()', function () {
        expect(render).instanceof(CRenderEngine);
    });
    it('switchCamera()', function() {
        const nCam = new OrthographicCamera(-30, 30, -30, 30);
        render.switchCamera(nCam);
        expect(render.camera).instanceof(OrthographicCamera);
    })
    it('switchScene()', function () {
        const nScene = new Scene();
        const box = new Mesh(new BoxGeometry(), new MeshBasicMaterial());
        nScene.add(box);
        render.switchScene(nScene);
        expect(render.scene.children).includes(box);
    });
});