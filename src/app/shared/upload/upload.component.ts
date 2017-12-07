
import { Component, ElementRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'upload-component',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.scss']
})
export class UploadComponent {
    form: FormGroup;
    loading: boolean = false;
    method = 'POST';
    url = './server/upload.php';
    // @Output NgModuleCompileResult

    @ViewChild('fileInput') fileInput: ElementRef;

    @Output() status: EventEmitter<any> = new EventEmitter(true);

    constructor(private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            name: ['', Validators.required],
            avatar: null
        });
    }

    onFileChange(event) {
        if (event.target.files.length > 0) {
            let file = event.target.files[0];
            this.form.get('avatar').setValue(file);
        }
    }

    private prepareSave(el): any {
        // console.log(el);
        let input = new FormData();
        input.append('name', this.form.get('name').value);
        input.append('avatar', this.form.get('avatar').value);
        input.append('images', el);
        return input;
    }

    forceSave() {
        this.onSubmit();
    }

    onSubmit() {

        if (this.fileInput.nativeElement.files[0] == undefined) {
            let percent = 100;

            this.status.emit({
                progress: {
                    percent: 100
                }
            });

            if (percent == 100) {
                this.loading = false;
            }

            return;
        }
        const formModel = this.prepareSave(this.fileInput.nativeElement.files[0]);

        // console.log(formModel);

        this.loading = true;
        // In a real-world app you'd have a http request / service call here like
        // this.http.post('apiUrl', formModel)
        // setTimeout(() => {
        // FormData cannot be inspected (see "Key difference"), hence no need to log it here
        //     console.log('done!');
        //     this.loading = false;
        // }, 1000);

        let xhr = new XMLHttpRequest();

        let uploadingFile = new UploadedFile(
            this.generateRandomIndex(),
            this.fileInput.nativeElement.files[0].name,
            this.fileInput.nativeElement.files[0].size
        );

        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable) {
                let percent = Math.round(e.loaded / e.total * 100);
                uploadingFile.setProgres({
                    total: e.total,
                    loaded: e.loaded,
                    percent: percent
                });

                this.status.emit(uploadingFile);

                if (percent == 100) {
                    this.loading = false;
                }
            }
        }

        xhr.upload.onabort = (e) => {
            uploadingFile.setAbort();
            this.status.emit(uploadingFile);
            this.loading = false;
        }

        xhr.upload.onerror = (e) => {
            uploadingFile.setError();
            this.status.emit(uploadingFile);
            this.loading = false;
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                uploadingFile.onFinished(
                    xhr.status,
                    xhr.statusText,
                    xhr.response
                );
                // this.removeFileFromQueue(queueIndex);
                this.status.emit(uploadingFile);
            }
        }

        xhr.open(this.method, this.url, true);
        // xhr.withCredentials = this.withCredentials;

        // if (this.customHeaders) {
        //     Object.keys(this.customHeaders).forEach((key) => {
        //         xhr.setRequestHeader(key, this.customHeaders[key]);
        //     });
        // }

        // if (this.authToken) {
        //     xhr.setRequestHeader("Authorization", `${this.authTokenPrefix} ${this.authToken}`);
        // }

        xhr.send(formModel);
    }

    clearFile() {
        this.form.get('avatar').setValue(null);
        this.fileInput.nativeElement.value = '';
    }

    generateRandomIndex(): string {
        return Math.random().toString(36).substring(7);
    }
}

class UploadedFile {
    id: string;
    status: number;
    statusText: string;
    progress: Object;
    originalName: string;
    size: number;
    response: string;
    done: boolean;
    error: boolean;
    abort: boolean;

    constructor(id: string, originalName: string, size: number) {
        this.id = id;
        this.originalName = originalName;
        this.size = size;
        this.progress = {
            loaded: 0,
            total: 0,
            percent: 0
        };
        this.done = false;
        this.error = false;
        this.abort = false;
    }

    setProgres(progress: Object): void {
        this.progress = progress;
    }

    setError(): void {
        this.error = true;
        this.done = true;
    }

    setAbort(): void {
        this.abort = true;
        this.done = true;
    }

    onFinished(status: number, statusText: string, response: string): void {
        this.status = status;
        this.statusText = statusText;
        this.response = response;
        this.done = true;
    }
}
