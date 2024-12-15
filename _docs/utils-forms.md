## FORMS

### Before start:

Em home.module.ts colocar ReactiveFormsModule nos imports:

```ts  
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule //<-- AQUI
  ],
  declarations: [HomePage, NoteDetailsComponent]
})
export class HomePageModule { }
```

No home.page.ts -> Para abrir a modal passar a "nota" selecionada ou "null" no caso de adição:

```ts
  async openDetails(note: note | null = null) {
    const modal = await this.modalCtrl.create({
      component: NoteDetailsComponent,
      componentProps: { note: note }, // <-- AQUI A NOTA EM CASO DE EDIÇÃO, NULL PARA ADICIONAR
      backdropDismiss: false
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (data && data.message === 'update') {
      await this.getNotes();
    }
  }
```

# A PARTIR DE AQUI ESTE CÓDIGO É NA MODAL

### TS

Colocar a instacia do formulário no TS

```ts
  
  note!: note; //<-- ESTA É A NOTA QUE VAI RECEBER EM EDIÇÃO
  apiUrl: string = "https://mobile-api-one.vercel.app/api";
  name: string = "";
  password: string = "";
  form: FormGroup = this.formBuilder.group({});;

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController,
    private formBuilder: FormBuilder) {
      this.setUpForm();
  }

  ngOnInit() { 
    if(this.note) {
      this.form.patchValue(this.note); // <-- CASO HAJA NOTA PREENCHE O FORMULÁRIO
    }
  }

  setUpForm() {
    this.form = this.formBuilder.group({
      description: ['', [Validators.required]],
      state: ['TODO', [Validators.required]],
      priority: ['NORMAL', [Validators.required]], 
    });
  }

    async save() {
    if(this.form.valid) { // <-- VERIFICA SE O FORMULÁRIO ESTÁ VALIDO
      if (this.note) {
        await this.putNote(this.form);
        return;
      }
      await this.postNote(this.form);
      return;
    }
    await this.presentToast(`Invalid form data!`, 'danger');
    return;
  }

   async postNote(form: FormGroup) {
    const loading = await this.showLoading();

    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${this.name}:${this.password}`)}`,
    });

    var newNote = form.value; // <-- OBJECTO COM OS VALORES DO FORMULÁRIO

    try {
      await firstValueFrom(this.http.post<note[]>(`${this.apiUrl}/notes`, newNote, { headers }));
      loading.dismiss();

      await this.presentToast(`Note successfully created 🚀`, 'success');

      await this.dismissModal("update");

    } catch (error: any) {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }

  async putNote(form: FormGroup) {
    const loading = await this.showLoading();

    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${this.name}:${this.password}`)}`,
    });

    var updatedNote = form.value; // <-- OBJECTO COM OS VALORES DO FORMULÁRIO
 
    try {
      await firstValueFrom(this.http.put<note[]>(`${this.apiUrl}/notes/${this.note.id}`, updatedNote, { headers }));
      loading.dismiss();

      await this.presentToast(`Note successfully created 🚀`, 'success');

      await this.dismissModal("update");


    } catch (error: any) {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }

  async deleteNote(note: note) {
    const loading = await this.showLoading();

    const headers = new HttpHeaders({
      Authorization: `Basic ${btoa(`${this.name}:${this.password}`)}`,
    });

    try {
      await firstValueFrom(this.http.delete(`${this.apiUrl}/notes/${note.id}`, { headers }));
      loading.dismiss();

      await this.presentToast(`Note successfully deleted 🚀`, 'success');

      await this.dismissModal("update");

    } catch (error: any) {
      loading.dismiss();
      await this.presentToast(error.error, 'danger');
    }
  }
```

```html

<ion-header>
    <ion-toolbar>
        <ion-buttons slot="start">
            <ion-button *ngIf="note" (click)="dismissModal()">Close</ion-button>
        </ion-buttons>
        <ion-title>
            Note
        </ion-title>
        <ion-buttons slot="end">
            <ion-button color="danger" *ngIf="note" (click)="deleteNote(note)">DELETE</ion-button>
        </ion-buttons>
    </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
    <form [formGroup]="form">
        <ion-item>
            <ion-label position="floating">Description</ion-label>
            <ion-textarea formControlName="description" placeholder="Description"></ion-textarea>
        </ion-item>
        <ion-note *ngIf="form.get('description')?.hasError('required') && form.get('description')?.touched"
            color="danger">
            Field is required!
        </ion-note>
        <ion-item>
            <ion-label>State</ion-label>
            <ion-select formControlName="state">
                <ion-select-option value="TODO">TODO</ion-select-option>
                <ion-select-option value="DONE">DONE</ion-select-option>
            </ion-select>
        </ion-item>
        <ion-item>
            <ion-label>Priority</ion-label>
            <ion-select formControlName="priority">
                <ion-select-option value="LOW">LOW</ion-select-option>
                <ion-select-option value="NORMAL">NORMAL</ion-select-option>
                <ion-select-option value="CRITICAL">CRITICAL</ion-select-option>
            </ion-select>
        </ion-item>
    </form>
</ion-content>

<ion-footer>
    <ion-toolbar>
        <ion-button color="sucess" (click)="save()" expand="full">SAVE</ion-button>
    </ion-toolbar>
</ion-footer>

```


## FUNÇÕES AUXILIARES
```ts
  //BEGIN - ANTES DO @COMPONENT
  interface note {
    id: String,
    description: String,
    state: State,
    priority: Priority,
    createdBy: String,
    createdAt: Date
    updatedBy: String,
    updatedAt: Date
  }

  enum State {
    TODO = 'TODO',
    DONE = 'DONE',
  }

  enum Priority {
    LOW = 'LOW',
    NORMAL = 'NORMAL',
    CRITICAL = "CRITICAL",
  }
  //END - ANTES DO @COMPONENT

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private toastController: ToastController) { }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading...',
      spinner: 'dots',
      showBackdrop: true
    });

    loading.present();

    return loading;
  }

  async presentToast(message: string, color: 'success' | 'danger' | 'warning') {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: "bottom",
      color: color
    });

    await toast.present();
  }

  async dismissModal(message : any = null) {
    this.modalCtrl.dismiss({message: message})
  }
  ```